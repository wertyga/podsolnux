import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { App } from 'shared/modules/App'

import { Home } from 'shared/modules/Home'
import { About } from 'shared/modules/About'
import { NotFound } from 'shared/modules/404'

// import { Home, About, NotFound } from 'shared/modules'

export const routes = (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/static/about" component={About} />
      <Route path="*" component={NotFound} />
    </Switch>
  </App>
);