import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'modules/bootstrap/dist/css/bootstrap.min.css';
import 'modules/font-awesome/css/font-awesome.min.css';

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