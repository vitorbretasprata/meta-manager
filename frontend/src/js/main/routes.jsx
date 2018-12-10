import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginApp from './loginApp';
import RegisterApp from './registerApp';
import HomeApp from './homeApp';
import error from '../components/error';
import { AuthProvider } from './AuthContext';
import Header from '../components/header';
import ProtectedRoute from './protectedRoute';

class Routes extends Component {    
    render(){        
        return (    
            <BrowserRouter>   
                <AuthProvider>
                    <Header />
                    <Route path='/login' component={LoginApp} />      
                    <Route path='/register' component={RegisterApp} />
                    <Switch>
                        <Route path='/' component={LoginApp} exact />                        
                        <ProtectedRoute path='/home' component={HomeApp} />  
                        <Route component={error} />                                              
                    </Switch>
                </AuthProvider>                                                 
            </BrowserRouter>        
        ) 
    } 
}

export default Routes;