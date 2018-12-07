import React from 'react';
import Input from './inputs';
import Button from './button';
import { Link } from 'react-router-dom';


const LoginTemplate = ({ sourcePathImage, size, loginFunc }) => (   
        
    <div className="loginTemplate">
        <form onSubmit={loginFunc}>
            <div className="alignTitleContent">
                <img src={sourcePathImage} width={size} height={size}/>
            </div>
            <Input type="email" placeholder="Email Address" name="email" id="emailLogin"/>
            <Input type="password" placeholder="Password" name="password" id="passwordLogin"/>
            <div class="custom-control custom-checkbox selects">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label textColor" for="customCheck1">Remember me</label>
            </div>
            <div className="form-group row">
                <Button type="submit"
                divClass="col-sm-12"
                buttonClass="btn btn-dark loginButton"
                textButton="Submit"/>               
            </div>  
            <div className="alignCenter">
                <Link to="/register">Register</Link> | <Link to="/reset">Reset Password</Link>
            </div>          
        </form>
    </div>     
       
)

export default LoginTemplate;