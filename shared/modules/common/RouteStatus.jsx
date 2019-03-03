import React from 'react';
import { Route } from 'react-router-dom';

export const RouteStatus = ({ status, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = status;

      return children;
    }}
  />
);