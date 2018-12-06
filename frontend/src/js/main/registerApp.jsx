import React, { Component } from 'react';
import RegisterTemplate from '../components/registerTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';

const URL = 'http://localhost:2000/api/auth/register'
class RegisterApp extends Component {
    constructor(){
        super();
        this.register = this.register.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.state = {
            userInfo: null ,
            success: false,
            selectedOption: null
        }
    }    

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    register(e){
        const data = e.target;
        e.preventDefault();
        if(data.password.value != data.confirm.value) {
            throw new Error("Password does not match.");
        }
        this.setState({
            userInfo: {
                name: data.name.value,
                email: data.email.value,
                password: data.password.value,                
                ocupation: data.ocupation.value,
                permission: data.permission.value,
                team: data.team.value
            }            
            
        }, () => {
            const userInfo = this.state.userInfo;
            
            Axios.post(URL, 
            {
                userInfo
            })
            .then(response => {
                this.setState({
                    success: true
                })
                console.log(response);                
            })
        });        
    }

    render(){
        const { selectedOption } = this.state;
        return(
            <RegisterTemplate 
            selectOption={selectedOption}
            handleSelectChange={this.handleSelectChange}
            successMessage={this.state.success}
            registerFunc={this.register} />
        )
    }
}

export default RegisterApp;