import React from 'react';
import Input from '../inputs';
import Button from '../button';
import { Link } from 'react-router-dom';

const ResetTemplate = ({ loginFunc, failed, ResetPassword,  message, type, placeholder, name, id, buttonTitle }) => ( 
    <div className="centerDiv"> 
    {!!failed && <Failed message="An Error has occured while sending the code."/>}       
        <div className="loginTemplate">
            <form onSubmit={loginFunc}>
                <div className="alignTitleContent">
                    Reset Password
                </div>
                <div className="alignContent textColor">
                    {message}
                </div>
                <Input type={type} placeholder={placeholder} name={name} id={id}/>
                {!!ResetPassword &&
                    <Input type="password" placeholder="Confirm" name="confirm" id="confirmParam"/>}
                <div className="form-group row">
                    <Button type="submit"
                    divClass="col-sm-12"
                    buttonClass="btn btn-dark loginButton"
                    textButton={buttonTitle}/>               
                </div>                        
            </form>
        </div>  
    </div>       
       
)

export default ResetTemplate;