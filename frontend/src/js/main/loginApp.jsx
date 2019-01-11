import React, { Component } from 'react';
import LoginTemplate from '../components/templates/loginTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import SetAuthorizationToken from '../components/utils/setAuthorizationToken'

const URL = 'http://localhost:2000/api/auth/login'
class LoginApp extends Component{
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.state = {
            paramEmail: '',
            paramPassword: '',
            failedLogin: false          
        }
    }

    login(e){
        const remember = e.target.rememberMe.checked;    
        this.setState({
            paramEmail: e.target.email.value,
            paramPassword: e.target.password.value
        }, () => {
            Axios.post(URL, 
                {
                    email: this.state.paramEmail,
                    password: this.state.paramPassword                    
                }).then((response) => {
                    const token = response.data.token;
                    if(remember == true){
                        localStorage.setItem('token_id', token); 
                        this.render();                         
                    } else if (remember == false) {
                        sessionStorage.setItem('token_id', token);  
                        this.render();                      
                    }
                }).catch(error => {
                    this.setState({ failedLogin: true })
                    console.log(error);
            })
        });        
    }

    render(){
        if(localStorage.getItem('token_id') || sessionStorage.getItem('token_id')){
            return <Redirect to='/home' />
        } else {
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
}

export default LoginApp

