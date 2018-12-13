import React, { Component } from 'react';
import LoginTemplate from '../components/templates/loginTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const URL = 'http://localhost:2000/api/auth/login'
class LoginApp extends Component{
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.state = {
            paramEmail: '',
            paramPassword: '',
            paramRemember: '',
            failedLogin: false          
        }
    }

    login(e){        
        e.preventDefault();

        this.setState({
            paramEmail: e.target.email.value,
            paramPassword: e.target.password.value ,
            paramRemember: e.target.rememberMe.value           
        }, () => {
            Axios.post(URL, 
                {
                    email: this.state.paramEmail,
                    password: this.state.paramPassword                    
                }).then((response) => { 
                    const token = response.data.token;  

                    if(paramRemember == true){
                        localStorage.setItem('token_id', token);
                    } else {
                        sessionStorage.setItem('token_id', token);
                    }
                    console.log(response);                    
                    console.log(token);                    
                }).catch(error => {
                    this.setState({ failedLogin: true })
                    console.log(error);
            })
        });        
    }

    render(){
        return(
            <LoginTemplate 
            failedLogin={this.state.failedLogin}            
            sourcePathImage="../src/images/logo.png" 
            height="80" 
            width="250"
            classname="loginImage" 
            loginFunc={this.login}/>
        )
    }
}

export default LoginApp

