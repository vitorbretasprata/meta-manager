import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './main/routes';

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
    module.hot.accept('./main/routes', () => {
        const NextApp = require('./main/routes').default

        App(NextApp)
    })
}