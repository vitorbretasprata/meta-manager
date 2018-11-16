import  React  from "react";
import { render } from "react-dom";
import { AppContainer } from 'react-hot-loader';
import  App  from "./app.js";


const renderApp = (App) => {
    render(
        <AppContainer>
            <App nome="Vitor" sobrenome="Prata"/>
        </AppContainer>,
        document.querySelector('[data-js="app"]')
    )
}

renderApp(App)


if(module.hot){
    module.hot.accept('./app', () => {
        const NextApp = require('./app').default

        renderApp(NextApp)
    })
}