import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginApp from './loginApp';
import RegisterApp from './registerApp';
import HomeApp from './homeApp';
import Failed from '../components/failed';
import { AuthProvider } from './AuthContext';
import Header from '../components/header';
import ProtectedRoute from './protectedRoute';
import DashboardApp from './dashboardApp';
import ViewApp from './viewApp';
import EditApp from './editApp';
import CreateApp from './createApp';
import AboutApp from './aboutApp';
import ResetApp from './resetApp';

class Routes extends Component {    
    render(){        
        return (    
            <BrowserRouter>   
                <AuthProvider>                    
                    <Switch>
                        <Route path='/login' component={LoginApp} />      
                        <Route path='/register' component={RegisterApp} />
                        <Route path='/resetPassword' component={ResetApp} />
                        <Route path='/register' component={RegisterApp} />
                    </Switch> 
                    <Header />                   
                    <Switch>
                        <Route path='/' component={HomeApp} exact />
                        <Route path='/home' component={HomeApp} />
                        <Route path='/about' component={AboutApp} />                       
                        <ProtectedRoute path='/dashboard' component={DashboardApp} />  
                        <ProtectedRoute path='/view' component={ViewApp} />
                        <ProtectedRoute path='/edit' component={EditApp} />
                        <ProtectedRoute path='/create' component={CreateApp} />
                        <Route component={Failed} />                                              
                    </Switch>
                </AuthProvider>                                                 
            </BrowserRouter>        
        ) 
    } 
}

export default Routes;