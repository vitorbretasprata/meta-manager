import React, { Component } from 'react';
import Axios from 'axios';
import { VERIFY, URL } from '../components/utils/consts';

const AuthContext = React.createContext();

class AuthProvider extends Component{
    constructor(){
        super();        
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.state = {        
            isAuth: false,
            paramEmail: '',
            paramPassword: '',
            paramRemember: '',
            nameUser: ''            
        }
    }

    isAuthenticated(token = '', remember = false){        
        if(token == ''){
            const localToken = localStorage.getItem('token_id');
            const sessionToken = sessionStorage.getItem('token_id');
    
            if(!localToken && !sessionToken) {            
                return false;
            }

            if(typeof localToken == 'undefined'){
                token = sessionToken;
            } else {
                token = localToken;
            }
        } 
        
        const header = {
            'Authorization' : `Bearer ${token}`
        }       

        Axios.post(VERIFY, {}, { headers: header }).then(res => {            
            this.setState({
                isAuth: true,                   
                nameUser: res.data.authData.payload.name
            }, () => {
                if(remember) {
                    localStorage.setItem('token_id', token);
                } else {
                    sessionStorage.setItem('token_id', token);
                }                            
            });
        }).catch(err => {
            console.log(err.message);
        });
        return true; 
    }

    login(e){
        e.preventDefault();
        const remember = e.target.rememberMe.checked;    
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
                    this.isAuthenticated(response.data.token, remember);                    
                }).catch(error => {                    
                    console.log(error.message);
            })
        });        
    }

    logout(){        
        
        sessionStorage.removeItem("token_id");
        localStorage.removeItem("token_id");
        this.setState({
            isAuth: false
        });        
    }   

    render(){
        return(
            <AuthContext.Provider
                value={{
                    state: this.state,                    
                    logout: this.logout,                    
                    isAuthenticated: this.isAuthenticated, 
                    login: this.login                  
                }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }