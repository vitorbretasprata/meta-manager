import React, { Component } from 'react';
import Axios from 'axios';
import checkError from '../components/utils/checkError';

const AuthContext = React.createContext();

class AuthProvider extends Component{
    constructor(){
        super();        
        this.logout = this.logout.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleRemember = this.handleRemember.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.state = {        
            isAuth: false,           
            email: '',
            password: '',
            remember: false,
            failedLogin: false,
            messageError: '',
            emailValid: false,
            pswValid: false,
            emailMSG: '',
            pswMSG: '',
            UserName: localStorage.getItem("user_name") || sessionStorage.getItem("user_name"),
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

    componentDidUpdate(prevProps, prevState) {
        if(localStorage.getItem("token_id") || sessionStorage.getItem("token_id")){
            if(this.state.UserName != prevState.UserName || this.state.UserName == "") {
                this.setState({
                    UserName: localStorage.getItem("user_name") || sessionStorage.getItem("user_name")
                });
            }
        }          
    }

    login = async (e) => {

        try {

            this.setState({
                isLoading: true
            });

            const { password, email, remember } = this.state;

            const body = {
                Email: email,
                Password: password
            }

            const response = await Axios.post(process.env.MAIN_AUTH + "login", body);            
            const checked = checkError(response);

            if (checked.code) {
                this.setState({
                    failedLogin: true,
                    messageError: checked.message
                });
            } else {
                if(remember) {
                    localStorage.setItem('token_id', checked.token);
                    localStorage.setItem("user_name", checked.name);
                } else {
                    sessionStorage.setItem('token_id', checked.token);
                    sessionStorage.setItem("user_name", checked.name);
                }
            } 

        } catch (error) {
            console.log(error);
        }             
    }

    handleUserInput = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleRemember = (e) => {
        const { checked } = e.target; 
        this.setState({
            remember: checked
        });
    } 
    
    checkInput = (e) => {
        e.preventDefault();
        let { pswMSG, pswValid, emailMSG, emailValid, password, email } = this.state;
        
        let rgEmail = new RegExp(/@.+\.+/gi);
        emailValid = rgEmail.test(email);

        if(email === '') {
            emailMSG = 'Email is required';
        } else if (!emailValid) {
            emailMSG = 'Invalid email format';
        } else {
            emailMSG = '';
        }    

        if(password === '') {
            pswMSG = 'Password is required';
            pswValid = false;
        } else {
            pswMSG = '';
            pswValid = true;
        }  
        
        this.setState({
            pswValid: pswValid,
            pswMSG: pswMSG,
            emailMSG: emailMSG,
            emailValid: emailValid
        }, () => this.checkValidation(this.state.emailValid, this.state.pswValid));
    }

    checkValidation = (emailValid, pswValid) => {
        if(emailValid && pswValid) {
            this.setState({
                formValid: true
            }, () => this.login());
        } else {
            this.setState({
                formValid: false
            });
        }
    }

    errorClass = (error) => {
        return(error.length === 0 ? '' : 'has-error');
    }

    logout = () => {        
        
        sessionStorage.removeItem("token_id");
        localStorage.removeItem("token_id");
        sessionStorage.removeItem("user_name");
        localStorage.removeItem("user_name");

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
                    checkInput: this.checkInput,
                    checkToken: this.checkToken,
                    handleRemember: this.handleRemember,
                    simpleAuth: this.simpleAuth,
                    handleUserInput: this.handleUserInput,
                    errorClass: this.errorClass 
                }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }