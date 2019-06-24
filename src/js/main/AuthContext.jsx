import React, { Component } from 'react';
import Axios from 'axios';
import checkError from '../components/utils/checkError';
import history from '../components/utils/history';

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
            UserName: "",
            isLoading: false            
        }
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

            this.setState({
                isLoading: true
            });

            e.preventDefault();
            const { target } = e;

            const body = {
                Email: target.email.value,
                Password: target.password.value
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
                    localStorage.setItem('token_id', checked.token);
                } else {
                    sessionStorage.setItem('token_id', checked.token);
                }
            } 
            
            const userInfo = this.authenticateUser(checked.token);

            if(userInfo.failedLogin) {
                this.setState({
                    failedLogin: true,
                    isLoading: false,
                    messageError: checked.message
                });
            } else {
                this.setState({
                    UserName: checked.Name,
                    isLoading: false
                });

                history.push('/');
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