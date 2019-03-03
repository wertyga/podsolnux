import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { Provider } from 'mobx-react';
// import { loadableReady } from '@loadable/component'

import './assets/styles/normalize.css';
import './assets/styles/style.scss';

import { initStore } from 'shared/store';
import { routes } from 'shared/routes';
import { rehydrate } from 'shared/utils';

const history = createBrowserHistory();
const { rootStore } = initStore(rehydrate(), history);

// loadableReady(() => {
//   hydrate(
//     <div>
//       <Provider {...rootStore.toProps()}>
//         <Router history={history}>{routes}</Router>
//       </Provider>
//     </div>,
//     document.getElementById('root'),
//   )
// });

hydrate(
  <div>
    <Provider {...rootStore.toProps()}>
      <Router history={history}>{routes}</Router>
    </Provider>
  </div>,
  document.getElementById('root'),
)

