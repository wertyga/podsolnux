import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home } from 'admin/client/components/Home'
import { NotFound } from 'admin/client/components/404'
import { LoginPage } from 'admin/client/components/LoginPage'
// import { BannerWrapper } from 'admin/client/components/BannerWrapper'
import { MainMenu } from 'admin/client/components/MainMenu'
import { AdminPricesWrapper, AdminPricesPrint } from 'admin/client/components/Prices'
import { UsersWrapper } from 'admin/client/components/UsersWrapper'
import { AdminOrders } from 'admin/client/components/Orders'

import { Container } from 'semantic-ui-react'

import 'admin/client/styles/app.sass'

export const routes = (
  <Container
    className="admin-wrapper"
  >
    <Switch>
      <Route path='/login' component={LoginPage} />

      <Route path='/*' render={() => (
        <div className="app">
          <MainMenu />

          <Switch>
            <Route exact path='/' component={Home} />
            {/*<Route path='/banners' component={BannerWrapper} />*/}
            <Route exact path='/prices' component={AdminPricesWrapper} />
            <Route exact path='/users' component={UsersWrapper} />
            <Route exact path='/print' component={AdminPricesPrint} />
            <Route exact path='/orders' component={AdminOrders} />
            <Route exact path='/order-error/:message' component={AdminOrders} />

            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      )} />
    </Switch>
  </Container>
);