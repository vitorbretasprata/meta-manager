import React from 'react';
import Input from '../inputs';
import Button from '../button';
import { Link } from 'react-router-dom';
import Failed from '../failed'

const LoginTemplate = ({ sourcePathImage, width, height, loginFunc, failedLogin, messageError }) => ( 
    <div className="centerDiv">
        {!!failedLogin && <Failed message={`Failed to login: ${messageError}`}/>}
        <div className="content-login">
            <form onSubmit={loginFunc}>
                <div className="alignTitleContent">
                    <img src={sourcePathImage} width={width} height={height}/>
                </div>
                <Input type="email" placeholder="Email Address" name="email" id="emailLogin"/>
                <Input type="password" placeholder="Password" name="password" id="passwordLogin"/>
                <div class="custom-control custom-checkbox selects">
                    <input type="checkbox" class="custom-control-input" id="rememberMe" name="rememberMe"/>
                    <label class="custom-control-label textColor" for="rememberMe">Remember me</label>
                </div>
                <div className="form-group row">
                    <Button type="submit"
                    divClass="col-sm-12"
                    buttonClass="btn btn-dark loginButton"
                    textButton="Submit"/>               
                </div>  
                <div className="alignCenter">
                    <Link to="/register">Register</Link> | <Link to="/resetPassword">Reset Password</Link>
                </div>          
            </form>
        </div>  
    </div>       
       
)

export default LoginTemplate;