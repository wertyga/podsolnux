import { initStore } from 'shared/store';
import { parseQuery } from 'shared/utils/query/query'

import { getHtml, indexFile } from './geHtml';

const confirmUser = async ({ path, url }, rootStore) => {
  if (path !== '/confirm') return;
  const { id } = parseQuery(url.replace(path, ''))

  const userStore = rootStore.get('userStore');
  await userStore.verifyUser(id)
}

const getPrices = async ({ path }, rootStore) => {
  if (path !== '/prices') return ;

  const { getPricesList } = rootStore.get('pricesStore');

  await getPricesList();
}

const getMenuList = async (req, rootStore, context) => {
  const menuStore = rootStore.get('menuStore');
  try {
    await menuStore.getList();
  } catch (e) {
    const { status } = e.response || {};
    context.status = status;
  }
}

const getUser = async (rootStore) => {
  const userStore = rootStore.get('userStore');
  const userID = rootStore.get('cookiesStore').get('userID');

  await userStore.getUser(userID)
}

const handleRequest = async (req, res, rootStore, context) => {
  try {
    await getMenuList(req, rootStore, context);

    await Promise.all([
      getPrices(req, rootStore, context),
      confirmUser(req, rootStore),
      getUser(rootStore),
    ]);
  } catch (e) {
    throw e;
  }
  return getHtml(req, res, rootStore, context);
};

export default function () {
  return async (req, res) => {
    try {
      const { rootStore, initRootStore } = initStore({
        cookiesStore: req.headers.cookie,
        execContextStore: req.headers['user-agent'],
      });
      initRootStore();

      const context = {};
      const html = await handleRequest(req, res, rootStore, context);

      if (context.url) {
        if (context.status) {
          res.redirect(context.status, context.url);
        } else {
          res.redirect(context.url);
        }
        return;
      }

      if (context.status) {
        res.status(context.status);
      }
      res.send(html);
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error(e);
      }
      res.send(indexFile);
    }
  };
}
