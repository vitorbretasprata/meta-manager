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
            user: {
                firstName: '',
                lastName: '',
                email: '',
                login: '',
                password: '',
                confirm: ''
            },
            company: {
                firstName: '',
                lastName: '',
                email: '',
                login: '',
                password: '',
                confirm: ''
            },
            userError: {
                firstName: '',
                lastName: '',
                email: '',
                login: '',
                password: '',
                confirm: ''
            },
            companyError: {
                firstName: '',
                lastName: '',
                email: '',
                login: '',
                password: '',
                confirm: ''
            },
            userValid: {
                firstName: false,
                lastName: false,
                email: false,
                login: false,
                password: false,
                confirm: false
            },
            companyValid: {
                firstName: false,
                lastName: false,
                email: false,
                login: false,
                password: false,
                confirm: false
            },
            formUser: false,
            formCompany: false,
            classUser: 'user active',
            classCompany: 'company',
            visibilityUser: true,
            visibilityCompany: false,
            isLoading: false
        }
    }    

    registerCompany = async () => {

        try {
            this.setState({
                isLoading: true
            });

            const { company } = this.state;
    
            if(company.password != company.confirm) {
                throw new Error("Password does not match.");
            }

            const userInfo = {
                Name: `${company.firstName} ${company.lastName}`,
                Email: company.email,
                Password: company.password,              
                Login: company.login,
                Role: 'admin'
            }

            const response = await Axios.post("https://ticket-manager-backend.herokuapp.com/api/auth/register", userInfo);

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

    registerUser = async () => {

        try {
            this.setState({
                isLoading: true
            });

            const { user } = this.state;

            if(user.password != user.confirm) {
                throw new Error("Password does not match.");
            }

            const userInfo = {
                Name: `${user.firstName} ${user.lastName}`,
                Email: user.email,
                Password: user.password,                
                Login: user.login,
                Role: 'user'
            }

            const response = await Axios.post("https://ticket-manager-backend.herokuapp.com/api/auth/register", userInfo);

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

    handleChangeText = (e, form) => {
        const { value, name } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [name]: value
            }
        });
    }

    checkInputUser = (e) => {
        e.preventDefault();
        let { user, userError, userValid } = this.state;
        
        let rgEmail = new RegExp(/@.+\.+/gi);
        userValid.email = rgEmail.test(user.email);

        if(user.firstName === '') {
            userError.firstName = 'First Name is required';
            userValid.firstName = false;
        } else {
            userError.firstName = '';
            userValid.firstName = true;
        }   
        
        if(user.lastName === '') {
            userError.lastName = 'Last Name is required';
            userValid.lastName = false;
        } else {
            userError.lastName = '';
            userValid.lastName = true;
        } 

        if(user.email === '') {
            userError.email = 'Email is required';
        } else if (!userValid.email) {
            userError.email = 'Invalid email format';
        } else {
            userError.email = '';
        } 

        if(user.login === '') {
            userError.login = 'Login is required';
            userValid.login = false;
        } else {
            userError.login = '';
            userValid.login = true;
        } 

        if(user.password === '') {
            userError.password = 'Password is required';
            userValid.password = false;
        } else {
            userError.password = '';
            userValid.password = true;
        }  

        if(user.confirm === '') {
            userError.confirm = 'Confirm Password is required';
            userValid.confirm = false;
        } else {
            userError.confirm = '';
            userValid.confirm = true;
        }
        
        this.setState({
            userError: userError,
            userValid: userValid            
        }, () => this.checkValidationUser(this.state.userValid));
    }

    checkInputCompany = (e) => {
        e.preventDefault();
        let { company, companyError, companyValid } = this.state;
        
        let rgEmail = new RegExp(/@.+\.+/gi);
        companyValid.email = rgEmail.test(company.email);

        if(company.firstName === '') {
            companyError.firstName = 'First Name is required';
            companyValid.firstName = false;
        } else {
            companyError.firstName = '';
            companyValid.firstName = true;
        }   
        
        if(company.lastName === '') {
            companyError.lastName = 'Last Name is required';
            companyValid.lastName = false;
        } else {
            companyError.lastName = '';
            companyValid.lastName = true;
        } 

        if(company.email === '') {
            companyError.email = 'Email is required';
        } else if (!companyValid.email) {
            companyError.email = 'Invalid email format';
        } else {
            companyError.email = '';
        } 

        if(company.login === '') {
            companyError.login = 'Company Name is required';
            companyValid.login = false;
        } else {
            companyError.login = '';
            companyValid.login = true;
        } 

        if(company.password === '') {
            companyError.password = 'Password is required';
            companyValid.password = false;
        } else {
            companyError.password = '';
            companyValid.password = true;
        }  

        if(company.confirm === '') {
            companyError.confirm = 'Confirm Password is required';
            companyValid.confirm = false;
        } else {
            companyError.confirm = '';
            companyValid.confirm = true;
        }
        
        this.setState({
            companyError: companyError,
            companyValid: companyValid            
        }, () => this.checkValidationCompany(this.state.companyValid));
    }

    checkValidationCompany = (company) => {
        let arr = []
        Object.keys(company).map((key, index) => {
            arr.push(company[key]);   
        });
        
        if(arr.includes(false)) {
            this.setState({
                formCompany: false
            });
        } else {
            this.setState({
                formCompany: true
            }, () => this.registerCompany());
        } 
    }
    
    checkValidationUser = (user) => {
        let arr = []
        Object.keys(user).map((key, index) => {
            arr.push(user[key]);                        
        });
        if(arr.includes(false)) {
            this.setState({
                formUser: false
            });
        } else {
            this.setState({
                formUser: true
            }, () => this.registerUser());
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
        const { 
            selectedOption,
            failed, 
            messageError, 
            success, 
            classCompany, 
            classUser, 
            visibilityUser, 
            visibilityCompany, 
            isLoading, 
            user, 
            company, 
            userError,
            companyError, 
            userValid, 
            companyValid 
        } = this.state;

        if(localStorage.getItem('token_id') || sessionStorage.getItem('token_id')){
            return <Redirect to='/home' />
        } else if(success){
            return <Redirect to='/login' />
        } else {
            return(
                <RegisterTemplate 
                    selectOption={selectedOption}
                    handleSelectChange={this.handleSelectChange}
                    registerUser={this.checkInputUser} 
                    registerCompany={this.checkInputCompany}
                    failed={failed}
                    failedMessage={messageError}
                    showCompany={this.showCompany}
                    showUser={this.showUser}
                    classUser={classUser}
                    classCompany={classCompany}
                    visibilityUser={visibilityUser}
                    visibilityCompany={visibilityCompany}
                    isLoading={isLoading}
                    userFirstName={user.fistName}
                    userLastName={user.lastName}
                    userEmail={user.email}
                    handleFirstNameUser={e => this.handleChangeText(e, 'user')}
                    handleLastNameUser={e => this.handleChangeText(e, 'user')}
                    handleEmailUser={e => this.handleChangeText(e, 'user')}
                    handleLoginUser={e => this.handleChangeText(e, 'user')}
                    handlePasswordUser={e => this.handleChangeText(e, 'user')}
                    handleConfirmUser={e => this.handleChangeText(e, 'user')}
                    handleFirstNameCompany={e => this.handleChangeText(e, 'company')}
                    handleLastNameCompany={e => this.handleChangeText(e, 'company')}
                    handleEmailCompany={e => this.handleChangeText(e, 'company')}
                    handleLoginCompany={e => this.handleChangeText(e, 'company')}
                    handlePasswordCompany={e => this.handleChangeText(e, 'company')}
                    handleConfirmCompany={e => this.handleChangeText(e, 'company')}
                    userLogin={user.login}
                    userPassword={user.password}
                    userConfirm={user.confirm}
                    companyFirstName={company.fistName}
                    companyLastName={company.lastName}
                    companyEmail={company.email}
                    companyLogin={company.login}
                    companyPassword={company.password}
                    companyConfirm={company.confirm}
                    userFirstNameValid={userValid.fistName}
                    userLastNameValid={userValid.lastName}
                    userEmailValid={userValid.email}
                    userLoginValid={userValid.login}
                    userPasswordValid={userValid.password}
                    userConfirmValid={userValid.confirm}
                    userFirstNameError={userError.firstName}
                    userLastNameError={userError.lastName}
                    userEmailError={userError.email}
                    userLoginError={userError.login}
                    userPasswordError={userError.password}
                    userConfirmError={userError.confirm}
                    companyFirstNameValid={companyValid.fistName}
                    companyLastNameValid={companyValid.lastName}
                    companyEmailValid={companyValid.email}
                    companyLoginValid={companyValid.login}
                    companyPasswordValid={companyValid.password}
                    companyConfirmValid={companyValid.confirm}
                    companyFirstNameError={companyError.firstName}
                    companyLastNameError={companyError.lastName}
                    companyEmailError={companyError.email}
                    companyLoginError={companyError.login}
                    companyPasswordError={companyError.password}
                    companyConfirmError={companyError.confirm}
                />
            ) 
        }
    }
}

export default RegisterApp;