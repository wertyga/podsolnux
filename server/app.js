import { initStore } from 'shared/store';

import { getHtml, indexFile } from './geHtml';

const handleRequest = async (req, res, rootStore, context) => {
  try {
    await Promise.all([]);
  } catch (e) {
    throw e;
  }
  return getHtml(req, res, rootStore, context);
};

export default function () {
  return async (req, res) => {
    try {
      const { universalCookies } = req;

      const { rootStore, initRootStore } = initStore({
        cookiesStore: universalCookies,
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
