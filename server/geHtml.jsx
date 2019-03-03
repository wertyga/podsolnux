import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { Helmet } from 'react-helmet';
import { dehydrateRootStore } from 'shared/utils';
import { AppRoot } from './AppRoot';

// --------- ServerSide_code_splitting
// const statsFile = path.resolve(process.cwd(), './public/static/loadable-stats.json')
// const extractor = new ChunkExtractor({ statsFile, entrypoints: ['bundle'] })
// -----------------------------------

export const indexFile = fs.readFileSync(
  path.resolve(process.cwd(), './client/index.html'),
  'utf8',
);

export const getHtml = (req, res, rootStore, context) => {
  const renderedApp = ReactDOMServer.renderToString(
    // extractor.collectChunks(<AppRoot req={req} context={context} store={rootStore} />)
    <AppRoot req={req} context={context} store={rootStore} />
  );

  // const scriptTags = extractor.getScriptTags()
  const { title, meta, link } = Helmet.renderStatic();

  return indexFile
    .replace('<!-- ::HELMET:: -->', [title, meta, link].map(it => it.toString()).join(''))
    .replace('<!-- ::APP:: -->', renderedApp)
    // .replace('<!-- ::BUNDLES:: -->', scriptTags)
    .replace(
      '<!-- ::DATA:: -->',
      `<script>window.__PRELOADED_STATE__=${dehydrateRootStore(rootStore)}</script>`,
    );
};
