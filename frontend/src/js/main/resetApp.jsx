import React, { Component } from 'react';
import ResetTemplate from '../components/templates/resetTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { SENDCODE, RESETPASS } from '../components/utils/consts';

class ResetApp extends Component{
    constructor(){
        super();
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            paramEmail: '',
            resetCode: '',
            Sended: false,
            confirmedCode: false,            
            Error: null,
            failed: false         
        }
    }

    sendMessage(e){
        e.preventDefault();           
        this.setState({
            emailParam: e.target.email.value                      
        }, () => {
            Axios.post(SENDCODE, 
                {
                    email: this.state.emailParam                                       
                }).then(response => {
                   this.setState({
                       resetCode: response.data.code,
                       Sended: true
                   });                     
                }).catch(error => {
                    this.setState({ Error: error })
                    console.log(error);
            })
        });        
    }

    verifyCode(e){
        e.preventDefault();        
        const code = e.targer.code.value;   
        if(this.state.confirmedCode == code){
            this.setState({
                Sended: false,
                confirmedCode: true 
            });
        }       
    }

    resetPassword(e){
        e.preventDefault();
        const passvalue = e.target;
        
        if(passvalue.passwordvalue != passvalue.confirm.value){
            throw Error("Password does not match.");
        }

        this.setState({
            password: passvalue.passwordvalue,                                  
        }, () => {
            Axios.post(RESETPASS, 
                {
                    email: this.state.paramEmail,
                    password: this.state.password                                     
                }).then(response => {
                   this.setState({
                       resetCode: response.data.code,
                       Sended: true
                   });                     
                }).catch(error => {
                    this.setState({ Error: error })
                    console.log(error);
            })
        });        
    }

    render(){
        const { Sended, confirmedCode } = this.state;
        if(localStorage.getItem('token_id') || sessionStorage.getItem('token_id')){
            return <Redirect to='/home' />
        } else if(Sended){
            return (
                <ResetTemplate 
                failed={this.state.failed}            
                message="Please inform the code received into your Email below" 
                type="text"
                name="code"
                placeholder="Reset Code"
                id="code"
                buttonTitle="Next"  
                ResetPassword={false}               
                loginFunc={this.verifyCode}/>
            )
        } else if(confirmedCode){
            return (
                <ResetTemplate 
                failedLogin={this.state.failed}            
                message="Please inform the new password below" 
                type="password"
                name="password"
                placeholder="Password"
                ResetPassword={true}
                id="passwordParam"
                buttonTitle="Submit"                
                loginFunc={this.resetPassword}/>
            )
        } else {
            return(
                <ResetTemplate 
                failedLogin={this.state.failed}            
                message="Please inform your Email" 
                type="email"
                name="email"
                placeholder="Email Address"
                id="emailParam"
                buttonTitle="Next"  
                ResetPassword={false}              
                loginFunc={this.sendMessage}/>
            )
        }        
    }
}

export default ResetApp;

