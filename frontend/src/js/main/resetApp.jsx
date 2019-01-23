import React, { Component } from 'react';
import ResetTemplate from '../components/templates/resetTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { SENDCODE, RESETPASS } from '../components/utils/consts';

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

    sendMessage(e){
        e.preventDefault();           
        this.setState({
            emailParam: e.target.email.value                      
        }, () => {
            Axios.post(SENDCODE, 
                {
                    email: this.state.emailParam                                       
                }).then(res => {
                   this.setState({
                       resetCode: res.data.Code,
                       Sended: true,
                       currentValue: '',
                       failed: false
                   });                     
                }).catch(err => {                    
                    this.setState({ 
                        error: err.response.data.message,
                        failed: true
                     });                    
            });
        });        
    }

    verifyCode(e){
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

    resetPassword(e){
        e.preventDefault();
        const passvalue = e.target;
        
        if(passvalue.password.value != passvalue.confirm.value){
            this.setState({
                error: "Password does not match the confirmation.",
                failed: true
            });
        } else {
            this.setState({
                password: passvalue.password.value,                                  
            }, () => {
                Axios.put(RESETPASS, 
                    {
                        email: this.state.paramEmail,
                        password: this.state.password                                     
                    }).then(res => {
                       this.setState({                       
                           passwordReseted: true,
                           confirmedCode: false,
                           currentValue: '',
                           failed: false
                       });                     
                    }).catch(err => {
                        this.setState({ 
                            error: err.response.data.message,
                            failed: true
                         });                        
                });
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

