import React, { Component } from 'react';
import RegisterTemplate from '../components/templates/registerTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import { REGISTER } from '../components/utils/consts'

class RegisterApp extends Component {
    constructor(){
        super();
        this.register = this.register.bind(this);        
        this.state = {
            userInfo: null ,
            success: false,
            selectedOption: null,
            failed: false
        }
    }    

    register(e){
        const data = e.target;
        e.preventDefault();
        if(data.password.value != data.confirm.value) {
            throw new Error("Password does not match.");
        }
        this.setState({
            userInfo: {
                name: `${data.firstName.value} ${data.lastName.value}`,
                email: data.email.value,
                password: data.password.value,                
                occupation: data.occupation.value,                
                team: data.team.value,
                login: data.login.value
            }
        }, () => {
            const userInfo = this.state.userInfo;
            
            Axios.post(REGISTER, 
            {
                userInfo
            })
            .then(response => {
                this.setState({
                    success: true
                });                                
            }).catch(err => {
                console.log(err);
                this.setState({
                    failed: true
                })
            });
        });        
    }

    render(){
        const { selectedOption, failed, success  } = this.state;

        if(localStorage.getItem('token_id') || sessionStorage.getItem('token_id')){
            return <Redirect to='/home' />
        } else if(success){
            return <Redirect to='/login' />
        } else {
            return(
                <RegisterTemplate 
                selectOption={selectedOption}
                handleSelectChange={this.handleSelectChange}
                registerFunc={this.register} 
                failedMessage={failed}/>
            )
        }
    }
}

export default RegisterApp;