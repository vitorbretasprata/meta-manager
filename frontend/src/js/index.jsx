import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './route/routes';

const App = (Routes) => {
    render(
        <AppContainer>
            <Routes />
        </AppContainer>,
        document.querySelector('[data-js="app"]')
    )
}

App(Routes)

if(module.hot){
    module.hot.accept('./route/routes', () => {
        const NextApp = require('./route/routes').default

        App(NextApp)
    })
}