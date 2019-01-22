import React, { Component } from 'react';
import ResetTemplate from '../components/templates/resetTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { SENDCODE, RESETPASS } from '../components/utils/consts';
import $ from 'jquery';

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

    componentDidMount(){
        $('#phoneParam').mask('+0000000000-0000');
    }

    sendMessage(e){
        e.preventDefault();           
        this.setState({
            phoneParam: e.target.phone.value                      
        }, () => {
            Axios.post(SENDCODE, 
                {
                    phone: this.state.phoneParam                                       
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
                message="Please inform the code recieved below" 
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
                message="Please inform your your Phone Number below" 
                type="text"
                name="phone"
                placeholder="+XX (XX) XXXXX-XXXX"
                id="phoneParam"
                buttonTitle="Next"  
                ResetPassword={false}              
                loginFunc={this.sendMessage}/>
            )
        }        
    }
}

export default ResetApp;

