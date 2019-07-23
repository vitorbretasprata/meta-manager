import React, { Component } from 'react';
import ResetTemplate from '../components/templates/resetTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class ResetApp extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.verifyCode = this.verifyCode.bind(this);
        this.resetPassword = this.resetPassword.bind(this);

        this.state = {
            paramEmail: '',
            resetCode: '',
            Sended: false,
            confirmedCode: false,
            passwordReseted: false,            
            error: null,
            failed: false,
            currentValue: ''       
        }
    }

    sendMessage = async (e) => {

        try {
            e.preventDefault();           
            const email = e.target.email.value;

            const response = await Axios.post(process.env.MAIN_AUTH + "checkEmail", { email });

            this.setState({
                resetCode: response.data.Code,
                Sended: true,
                currentValue: '',
                failed: false,
                email: email
            });

        } catch (error) {
            this.setState({
                error: error.message,
                failed: true
            });
        }     
    }

    verifyCode = (e) => {

        e.preventDefault();
        const code = e.target.code.value;

        if(this.state.resetCode == code){
            this.setState({
                Sended: false,
                confirmedCode: true,
                currentValue: '',
                failed: false
            });
        } else {
            this.setState({
                error: "Invalid Code.",
                failed: true
            });
        }      
    }

    handleChange(e){
        this.setState({
            currentValue: e.target.value
        });
    }

    resetPassword = async (e) => {

        try {
            e.preventDefault();
            const { target } = e;

            if(target.password.value != target.confirm.value) {
                this.setState({
                    error: "Password does not match the confirmation.",
                    failed: true
                });
            } else {

                await Axios.put(process.env.MAIN_AUTH + "resetPassword", 
                    { 
                        email: email,
                        password: target.password.value
                    });

                this.setState({                       
                    passwordReseted: true,
                    confirmedCode: false,
                    currentValue: '',
                    failed: false
                }); 
            }

        } catch(error) {
            this.setState({ 
                error: error.message,
                failed: true
             });
        }             
    }

    render(){
        const { error, failed, Sended, confirmedCode, passwordReseted, currentValue } = this.state;

        if(localStorage.getItem('token_id') || sessionStorage.getItem('token_id')){
            return <Redirect to='/home' />

        } else if(Sended){
            return (        
                <ResetTemplate
                failed={failed}
                errorMessage={(failed) ? error : ""}                 
                message="Please inform the code received into your Email below" 
                type="text"
                name="code"
                placeholder="Reset Code"
                id="code"
                currentValue={currentValue}
                buttonTitle="Next"  
                ResetPassword={false} 
                handleChange={this.handleChange}                 
                loginFunc={this.verifyCode}/>
            )
        } else if(confirmedCode){
            return (
                <ResetTemplate 
                failed={failed}
                errorMessage={(failed) ? error : ""}             
                message="Please inform the new password below" 
                type="password"
                name="password"
                placeholder="Password"
                ResetPassword={true}
                id="passwordParam"
                buttonTitle="Submit"
                handleChange={this.handleChange}                 
                loginFunc={this.resetPassword}/>
            )
        } else if(passwordReseted){
            return <Redirect to='/login' />            
        } else {
            return(
                <ResetTemplate 
                failed={failed}
                errorMessage={(failed) ? error : ""}            
                message="Please inform your Email" 
                type="email"
                name="email"
                placeholder="Email Address"
                id="emailParam"
                buttonTitle="Next"  
                ResetPassword={false}
                handleChange={this.handleChange}            
                loginFunc={this.sendMessage}/>
            )
        }       
    }
}

export default ResetApp;

