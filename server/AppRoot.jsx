import React, { Component } from 'react';
import { Provider, useStaticRendering } from 'mobx-react';
import { StaticRouter } from 'react-router';

import { routes } from 'shared/routes';

useStaticRendering(true);

export class AppRoot extends Component {
  render() {
    const { store, req, context } = this.props;
    return (
      <div>
        <Provider {...store.toProps()}>
          <StaticRouter location={req.url} context={context}>
            { routes }
          </StaticRouter>
        </Provider>
      </div>
    );
  }
}
