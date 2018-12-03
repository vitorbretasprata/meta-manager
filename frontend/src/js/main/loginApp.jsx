import React, { Component } from 'react';
import LoginTemplate from '../components/loginTemplate';
import Axios from 'axios';


const URL = 'http://localhost:2000/api/auth/login'
class LoginApp extends Component{
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.state = {
            paramEmail: '',
            paramPassword: ''            
        }
    }

    login(e){        
        e.preventDefault();

        this.setState({
            paramEmail: e.target.email.value,
            paramPassword: e.target.password.value
        });

        Axios.post(URL, 
        {
            email: this.state.paramEmail,
            password: this.state.paramPassword
            
        }, (response) => {            
            console.log(response) 
            this.setToken(res.token)           
        }).catch(error => {
            console.log(error);
        }).then((res) => localStorage.setItem('Teste-jwt', res));
    }

    render(){
        return(
            <LoginTemplate 
            successMessage={success}
            sourcePathImage="../../images/logo.jpg" 
            size="70" 
            classname="loginImage" 
            loginFunc={this.login}/>
        )
    }
}

export default LoginApp

