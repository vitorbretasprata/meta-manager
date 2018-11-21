import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';


import LoginApp from './loginApp.jsx';

const Login = (LoginApp) => {
    render(
        <AppContainer>
            <LoginApp />
        </AppContainer>,
        document.querySelector('[data-js="loginApp"]')
    )
}

Login(LoginApp)

if(module.hot){
    module.hot.accept('./loginApp', () => {
        const NextApp = require('./loginApp').default

        renderApp(NextApp)
    })
}