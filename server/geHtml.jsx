import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';

import { Helmet } from 'react-helmet';
import { dehydrateRootStore } from 'shared/utils';
import { AppRoot } from './AppRoot';

export const indexFile = fs.readFileSync(
  process.env.NODE_ENV === 'development' ?
    path.resolve(process.cwd(), './client/index.html') :
    path.resolve(process.cwd(), './podsolnux/client/index.html'),
  'utf8',
);

export const getHtml = (req, res, rootStore, context) => {


  const renderedApp = renderToString(
    <AppRoot req={req} context={context} store={rootStore} />
  );

  const { title, meta, link } = Helmet.renderStatic();

  return indexFile
    .replace('<!-- ::HELMET:: -->', [title, meta, link].map(it => it.toString()).join(''))
    .replace('<!-- ::APP:: -->', renderedApp)
    .replace(
      '<!-- ::DATA:: -->',
      `<script>window.__PRELOADED_STATE__=${dehydrateRootStore(rootStore)}</script>`,
    );
};
