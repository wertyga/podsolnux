import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home } from 'admin/client/components/Home'
import { Container } from 'semantic-ui-react'

import 'admin/client/styles/app.sass'

const getRoute = (path = '') => `/hawabanga${path}`

export const routes = (
  <Container
    className="admin-wrapper"
  >
    <Switch>
      <Route exact path={getRoute()} component={Home} />
    </Switch>
  </Container>
);