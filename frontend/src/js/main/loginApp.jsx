import React, { Component } from 'react';
import LoginTemplate from '../components/loginTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

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
        }, () => {
            Axios.post(URL, 
                {
                    email: this.state.paramEmail,
                    password: this.state.paramPassword                    
                }).then((response) => { 
                    console.log(response);
                    const token = response.data.token;  
                    console.log(token);
                    localStorage.setItem('token_id', token);
                }).catch(error => {
                    console.log(error);
            })
        });        
    }

    render(){
        return(
            <LoginTemplate             
            sourcePathImage="../src/images/logo.jpg" 
            size="70" 
            classname="loginImage" 
            loginFunc={this.login}/>
        )
    }
}

export default LoginApp

