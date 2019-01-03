import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginApp from './loginApp';
import RegisterApp from './registerApp';
import HomeApp from './homeApp';
import error from '../components/error';
import { AuthProvider } from './AuthContext';
import Header from '../components/header';
import ProtectedRoute from './protectedRoute';
import DashboardApp from './dashboardApp'
import ViewApp from './viewApp'
import EditApp from './editApp'

class Routes extends Component {    
    render(){        
        return (    
            <BrowserRouter>   
                <AuthProvider>                    
                    <Switch>
                        <Route path='/login' component={LoginApp} />      
                        <Route path='/register' component={RegisterApp} />
                    </Switch> 
                    <Header />                   
                    <Switch>
                        <Route path='/' component={HomeApp} exact />                        
                        <ProtectedRoute path='/dashboard' component={DashboardApp} />  
                        <ProtectedRoute path='/view' component={ViewApp} />
                        <ProtectedRoute path='/edit' component={EditApp} />
                        <Route component={error} />                                              
                    </Switch>
                </AuthProvider>                                                 
            </BrowserRouter>        
        ) 
    } 
}

export default Routes;