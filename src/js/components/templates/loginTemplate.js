import React from 'react';
import Input from '../inputs';
import { Link } from 'react-router-dom';
import Failed from '../failed';
import ReactLoading from 'react-loading';
import FormError from "../utils/formError";

const LoginTemplate = ({ loginFunc, failedLogin, messageError, isLoading, valueEmail, valuePassword, handleEmail, handlePass, pswValid, emailValid, pswMSG, emailMSG, handleRemember }) => ( 
    <div>
        <form onSubmit={loginFunc} noValidate className="form-container">
            {!!failedLogin && <Failed message={`Failed to login: ${messageError}`}/>}

            <div className="alignContent">
                <p>Login</p>
            </div>
            <Input type="email" placeholder="Email Address" name="email" id="emailLogin" value={valueEmail} handleChange={handleEmail} />
            <FormError isError={!emailValid} errorMsg={emailMSG} />
            <Input type="password" placeholder="Password" name="password" id="passwordLogin" value={valuePassword} handleChange={handlePass} />
            <FormError isError={!pswValid} errorMsg={pswMSG} />
            <div className="custom-control custom-checkbox selects">
                <input type="checkbox" className="form-control-input check-position" id="rememberMe" name="rememberMe" onChange={handleRemember}/>
                <label className="form-control-label text-color text-position" htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="form-group">
                <button className="btn btn-dark loginButton" type="submit">
                    {isLoading ? <ReactLoading type="spin" id="loading" color="white" height={25} width={25}/> : "Submit"}
                </button>          
            </div>  
            <div className="alignContent">
                <Link to="/register">Register</Link> | <Link to="/resetPassword">Reset Password</Link>
            </div>          
        </form>
    </div>       
       
)

export default LoginTemplate;