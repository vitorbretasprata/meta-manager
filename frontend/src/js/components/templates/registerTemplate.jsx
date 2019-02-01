import React from 'react';
import Input from '../inputs';
import Button from '../button';
import SuccessRegistration from '../successRegistration';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { occupation, team } from '../utils/consts'
import Failed from '../failed';

const registerTemplate = ({ registerFunc, failedMessage }) => (
    <div className="centerDiv">
        {!!failedMessage && <Failed message="Failed to registrate: Email already in use!"/>} 
        <div className="loginTemplate">
            <div className="alignTitleContent">
                <h2>Register</h2>
            </div>
            <form onSubmit={registerFunc} method='POST'>
                <div className="gridName">
                    <div>
                        <Input type="text" placeholder="First Name" id="firstNameRegister" name="firstName"/>
                    </div>
                    <div>
                        <Input type="text" placeholder="Last Name" id="lastNameRegister" name="lastName"/>
                    </div>    
                </div>                
                <Input type="email" placeholder="Email Address" id="emailRegister" name="email"/> 
                <Input type="text" placeholder="Login Name" id="loginRegister" name="login"/>   
                <div className="gridName">
                    <div>
                        <Input type="password" placeholder="Password" id="passwordRegister" name="password"/>                    </div>
                    <div>
                        <Input type="password" placeholder="Confirm Password" id="passwordConf" name="confirm"/>
                    </div>    
                </div>                
                <div className="gridName selects">
                    <div>
                        <Select options={team} placeholder="Team" name="team" />                         
                    </div>
                    <div>
                        <Select options={occupation} placeholder="Occupation" name="occupation" />
                    </div>    
                </div>
                          
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