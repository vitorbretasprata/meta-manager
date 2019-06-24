import React, { Component } from 'react';
import RegisterTemplate from '../components/templates/registerTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import checkError from '../components/utils/checkError';

class RegisterApp extends Component {
    constructor(){
        super();
        this.registerUser = this.registerUser.bind(this);  
        this.registerCompany = this.registerCompany.bind(this);      
        this.state = {
            userInfo: null ,
            success: false,
            selectedOption: null,
            failed: false,
            messageError: '',
            error: {},
            classUser: 'user active',
            classCompany: 'company',
            visibilityUser: true,
            visibilityCompany: false,
            isLoading: false
        }
    }    

    registerCompany = async (e) => {

        try {
            this.setState({
                isLoading: true
            });

            const { target } = e.target;
            e.preventDefault();
    
            if(target.password.value != target.confirm.value) {
                throw new Error("Password does not match.");
            }

            const userInfo = {
                Name: `${target.firstName.value} ${target.lastName.value}`,
                Email: target.email.value,
                Password: target.password.value,              
                Login: target.login.value,
                Role: 'admin'
            }

            const response = await Axios.post('http://localhost:2000/api/auth/register', userInfo);

            const checked = checkError(response);

            if (checked.code) {

                this.setState({
                    failed: true,
                    messageError: checked.message
                });

            } else {

                this.setState({
                    success: true,
                    isLoading: false
                });

            }     
            
        } catch(error) {

            this.setState({
                failed: true,
                error: error.message
            });

        }    
    }

    registerUser = async (e) => {

        try {
            this.setState({
                isLoading: true
            });

            const { target } = e;

            e.preventDefault();

            if(target.password.value != target.confirm.value) {
                throw new Error("Password does not match.");
            }

            const userInfo = {
                Name: `${target.firstName.value} ${target.lastName.value}`,
                Email: target.email.value,
                Password: target.password.value,                
                Login: target.login.value,
                Role: 'user'
            }

            const response = await Axios.post('http://localhost:2000/api/auth/register', userInfo);

            const checked = checkError(response);

            if (checked.code) {

                this.setState({
                    failed: true,
                    messageError: checked.message
                });

            } else {

                this.setState({
                    success: true,
                    isLoading: false
                });

            }     
            
        } catch(error) {
            console.log(error);
            this.setState({
                failed: true,
                error: error.message
            });

        }    
         
    }

    showUser = () => {
        this.setState({
            classUser: 'user active',
            classCompany: 'company',
            visibilityUser: true,
            visibilityCompany: false
        });
    }

    showCompany = () => {
        this.setState({
            classUser: 'user',
            classCompany: 'company active',
            visibilityCompany: true,
            visibilityUser: false
        });
    }

    render(){
        const { selectedOption, failed, messageError, success, classCompany, classUser, visibilityUser, visibilityCompany, isLoading } = this.state;

        if(localStorage.getItem('token_id') || sessionStorage.getItem('token_id')){
            return <Redirect to='/home' />
        } else if(success){
            return <Redirect to='/login' />
        } else {
            return(
                <RegisterTemplate 
                selectOption={selectedOption}
                handleSelectChange={this.handleSelectChange}
                registerUser={this.registerUser} 
                registerCompany={this.registerCompany}
                failed={failed}
                failedMessage={messageError}
                showCompany={this.showCompany}
                showUser={this.showUser}
                classUser={classUser}
                classCompany={classCompany}
                visibilityUser={visibilityUser}
                visibilityCompany={visibilityCompany}
                isLoading={isLoading}/>
            )
        }
    }
}

export default RegisterApp;