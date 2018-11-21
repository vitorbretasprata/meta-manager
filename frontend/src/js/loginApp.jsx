import React, { Component } from 'react';
import LoginTemplate from './components/loginTemplate';
import Axios from 'axios';

class LoginApp extends Component{
    constructor(){
        super();
        this.login = this.login.bind(this);
    }

    login(){
        Axios.get('http://localhost:200/api/auth/getUser', () => {
            
        })
    }

    render(){
        return(
            <LoginTemplate 
            sourcePathImage="../images/logo.jpg" 
            size="70" 
            classname="loginImage" 
            loginFunc={this.login}/>
        )
    }
}

export default LoginApp

