import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';

import LoginApp from '../main/loginApp';
import RegisterApp from '../main/registerApp';
import HomeApp from '../main/homeApp';

const Routes = () => {
    <BrowserRouter>
        <div>
            <Switch>
                <Router>
                    <Route path='/login' component={LoginApp} exact />
                    <Route path='/register' component={RegisterApp} />
                    <Route path='/home' component={HomeApp} />  
                </Router>                                  
            </Switch>
        </div>                
    </BrowserRouter>
}           

export default Routes;