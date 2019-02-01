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
                        sourcePathImage="../src/images/logo.png" 
                        height="80" 
                        width="250"
                        classname="loginImage" 
                        loginFunc={(e) => context.login(e)}/>
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

