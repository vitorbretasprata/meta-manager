import React from 'react';
import Input from '../inputs';
import Button from '../button';
import Failed from '../failed';

const ResetTemplate = ({ loginFunc, errorMessage, currentValue, failed, ResetPassword,  message, type, placeholder, name, id, buttonTitle, handleChange }) => ( 
    <div className="centerDiv"> 
    {!!failed && <Failed message={errorMessage}/>}       
        <div className="loginTemplate">
            <form onSubmit={loginFunc}>
                <div className="alignTitleContent">
                    Reset Password
                </div>
                <div className="alignContent textColor">
                    {message}
                </div>
                <input className="inputForm selects" type={type} placeholder={placeholder} name={name} id={id} value={currentValue} onChange={handleChange}/>
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