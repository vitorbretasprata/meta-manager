import React, { Component } from 'react';
import LoginTemplate from '../components/loginTemplate';
import Axios from 'axios';

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
        console.log(e);

        this.setState({
            paramEmail: e.target.email.value,
            paramPassword: e.target.password.value
        });

        Axios.get('http://localhost:2000/api/auth/getUser', {
            params: {
                email: `${paramEmail}`,
                password: `${paramPassword}`
            }
        }, (response) => {
            if(response){
                
            }
        }).catch(error => {
            console.log(error);
        }).then((res) => localStorage.setItem('Teste-jwt', res.data));
    }

    render(){
        return(
            <LoginTemplate 
            sourcePathImage="../../images/logo.jpg" 
            size="70" 
            classname="loginImage" 
            loginFunc={this.login}/>
        )
    }
}

export default LoginApp

