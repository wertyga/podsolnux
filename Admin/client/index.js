import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { routes } from 'admin/routes'

import { initStore } from 'shared/store';

import './styles/index.sass';
import 'semantic-ui-css/semantic.min.css';

const history = createBrowserHistory();
const { rootStore } = initStore({}, history);

render (
  <Provider store={rootStore.toProps()}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
