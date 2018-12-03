import React from 'react';
import Input from './inputs';
import Button from './button';
import SuccessLogin from './succesLogin';
import { Link } from 'react-router-dom';

const registerTemplate = ({ registerFunc, successMessage }) => (
    <div>
        {!!successMessage && <SuccessLogin />}  
        <div className="loginTemplate">
            <div>
                <h2>Register</h2>
            </div>
            <form onSubmit={registerFunc} method='POST'>
                <Input type="name" placeholder="Full Name" id="nameRegister" name="name"/>
                <Input type="email" placeholder="Email Address" id="emailRegister" name="email"/>           
                <Input type="password" placeholder="Password" id="passwordRegister" name="password"/>
                <Input type="password" placeholder="Confirm Password" id="passwordConf" name="confirm"/>
                <Input type="text" placeholder="Ocupation"  id="ocupationRegister" name="ocupation"/>
                <Input type="text" placeholder="Permission" id="permissionRegister" name="permission"/>
                <Input type="text" placeholder="Related Team" id="teamRegister" name="team"/>            
                <div className="form-group row">
                    <Button type="submit"
                    divClass="col-sm-12"
                    buttonClass="btn btn-dark loginButton"
                    textButton="Submit"/>               
                </div>  
                <div className="alignCenter">
                    <Link to="/login">Login</Link>
                </div>          
            </form>
        </div> 
    </div>
    
)

export default registerTemplate;