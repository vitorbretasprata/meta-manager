import React, { Component } from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';

import LoginApp from './loginApp';
import RegisterApp from './registerApp';
import HomeApp from './homeApp';
import error from '../components/error';

class Routes extends Component {

    render(){
        return (    
            <BrowserRouter>        
                <Switch>
                    <Route path='/' component={LoginApp} exact />
                    <Route path='/login' component={LoginApp} />      
                    <Route path='/register' component={RegisterApp} />
                    <Route path='/home' component={HomeApp} />  
                    <Route component={error} />                                              
                </Switch>                               
            </BrowserRouter>        
        ) 
    } 

  }

export default Routes;