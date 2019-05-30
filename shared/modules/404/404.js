import React from 'react';
import { RouteStatus, Page } from '../common';

export const NotFound = () => {
    return (
    <RouteStatus status={404}>
        <Page className="not-found-page"
             style={{
                 width: '100%',
                 height: '100vh',
                 display: 'flex',
                 alignItems: 'center',
                 zIndex: 100,
                 paddingTop: '10%',
                 flexDirection: 'column'}}>
            <h2>Page not found</h2>
            <h1>404 Error</h1>
        </Page>
    </RouteStatus>
    );
};