import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import style from "./css/app.css";
import Routes from './js/main/routes';

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
        const NextApp = require('./js/main/routes').default

        App(NextApp)
    })
}