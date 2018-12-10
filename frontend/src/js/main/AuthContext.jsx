import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const AuthContext = React.createContext();

class AuthProvider extends Component{
    state = { 
        isSession: false,
        isAuth: false
    }

    constructor(){
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    login(){
        this.hisstory.pushState(null, 'login');
    }

    logout(){
        if(this.state.isSession == true){
            sessionStorage.removeItem("token_id");
            this.refresh();
        } else {
            localStorage.removeItem("token_id");
            this.refresh();
        }
    }

    refresh(){
        if(this.state.isSession == true){
            if(sessionStorage.getItem("token_id")){
                this.setState({
                    isAuth: true
                });
                <Redirect to="/home" />
            }
        } else if(this.state.isSession == false){
            if(localStorage.getItem("token_id")){
                this.setState({
                    isAuth: true
                });
                <Redirect to="/home" />
            }
        }

        if(this.state.isSession == true){
            if(!sessionStorage.getItem("token_id")){
                <Redirect to="/" />
            }
        } else if(this.state.isSession == false){
            if(!localStorage.getItem("token_id")){
                <Redirect to="/" />
            }
        }
    }

    render(){
        return(
            <AuthContext.Provider
                value={{
                    state: this.state,
                    login: this.login,
                    logout: this.logout,
                    refresh: this.refresh                    
                }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }