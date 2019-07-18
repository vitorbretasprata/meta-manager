import React, { Component } from 'react';
import LoginTemplate from '../components/templates/loginTemplate';
import { Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

class LoginApp extends Component{   

    render(){  
        return(
        <AuthConsumer>
            {(context) => (
                <div className="centerDiv">
                    {!context.state.isAuth ? (
                        <LoginTemplate 
                        failedLogin={context.state.failedLogin}    
                        messageError={context.state.messageError}
                        redirect={context.redirect}  
                        valueEmail={context.state.email}
                        handleEmail={context.handleUserInput}
                        handlePass={context.handleUserInput}
                        valuePassword={context.state.password}
                        emailValid={context.state.emailValid}
                        pswValid={context.state.pswValid}
                        pswMSG={context.state.pswMSG}
                        emailMSG={context.state.emailMSG}
                        isDisabled={context.state.formValid}
                        handleRemember={context.handleRemember}
                        classname="loginImage" 
                        loginFunc={context.checkInput}/>
                    ) : (
                        <Redirect to='/home' />
                    )}
                </div>                                        
            )}                
        </AuthConsumer>                
        )
    }
}

export default LoginApp

