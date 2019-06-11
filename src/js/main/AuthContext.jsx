import React, { Component } from 'react';
import Axios from 'axios';
import checkError from '../components/utils/checkError';

const AuthContext = React.createContext();

class AuthProvider extends Component{
    constructor(){
        super();        
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.state = {        
            isAuth: false,           
            nameUser: '',
            failedLogin: false,
            messageError: '',
            userInfo: {}         
        }
    }    

    checkToken = () => {
        let token = localStorage.getItem("token_id");

        if(!token) {
            token = sessionStorage.getItem("token_id");
        }

        return token;
    }

    simpleAuth = () => {
        const token = localStorage.getItem("token_id") || sessionStorage.getItem("token_id");

        if(!token) {
            return false;
        }

        return true;
    }

    authenticateUser = async (token) => {

        const validToken = await Axios.post("http://localhost:2000/api/auth/checkToken", token);

        const checked = checkError(validToken);

        if(checked.code) {
            return {
                failedLogin: true,
                messageError: checked.message
            }
        }

        return checked;
    }

    login = async (e) => {

        try {

            e.preventDefault();
            const { target } = e;

            const body = {
                email: target.email.value,
                password: target.password.value
            }
            const remember = e.target.rememberMe.checked;            
            const response = await Axios.post("http://localhost:2000/api/auth/login", body);
            
            const checked = checkError(response);

            if (checked.code) {
                this.setState({
                    failedLogin: true,
                    messageError: checked.message
                });
            } else {
                if(remember) {
                    localStorage.setItem('token_id', checked);
                } else {
                    sessionStorage.setItem('token_id', checked);
                }
            } 
            
            const userInfo = this.authenticateUser(checked);

            if(userInfo.failedLogin) {
                this.setState({
                    failedLogin: true,
                    messageError: checked.message
                });
            } else {
                this.setState({
                    userInfo: userInfo
                });
            }

        } catch (error) {
            console.log(error);
        }             
    }

    logout = () => {        
        
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
                    login: this.login,
                    checkToken: this.checkToken,
                    simpleAuth: this.simpleAuth
                }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }