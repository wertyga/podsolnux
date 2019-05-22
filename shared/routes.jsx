import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { App } from 'shared/modules/App'

import { Home } from 'shared/modules/Home'
import { About } from 'shared/modules/About'
import { NotFound } from 'shared/modules/404'
import { PricesPage } from 'shared/modules/Prices'
import { HowToOrder } from 'shared/modules/HowToOrder'
import { AuthPage } from 'shared/modules/AuthPage'
import { ConfirmPage } from 'shared/modules/ConfirmPage'
import { LKWrapper } from 'shared/modules/User'
import { SetOrder, IssueOrder, OrderView } from 'shared/modules/Order'
import { Address} from 'shared/modules/Address'

export const routes = (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/how-to-order" component={HowToOrder} />
      <Route exact path="/prices" component={PricesPage} />
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/confirm" component={ConfirmPage} />
      <Route path="/user" component={LKWrapper} />
      <Route exact path="/set-order" component={SetOrder} />
      <Route exact path="/issue-order" component={IssueOrder} />
      <Route exact path="/thanks-for-order" component={OrderView} />
      <Route exact path="/address" component={Address} />

      <Route path="*" component={NotFound} />
    </Switch>
  </App>
);