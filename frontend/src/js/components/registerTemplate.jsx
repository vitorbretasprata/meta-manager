import React from 'react';
import Input from './inputs';
import Button from './button';
import SuccessRegistration from './successRegistration';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const ocupation = [
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'support', label: 'Support' }
  ];

const team = [    
    { value: 'dev', label: 'Dev' },
    { value: 'support', label: 'Support' },
    { value: 'attendance', label: 'Attendance' }
  ];

const options = [
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'support', label: 'Support' },
    { value: 'commercial', label: 'Commercial' }
];

const registerTemplate = ({ registerFunc, successMessage, selectOption, handleSelectChange }) => (
    <div>
        {!!successMessage && <SuccessRegistration />}  
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
                <Input type="password" placeholder="Password" id="passwordRegister" name="password"/>
                <Input type="password" placeholder="Confirm Password" id="passwordConf" name="confirm"/>
                <div className="gridName selects">
                    <div>
                        <Select options={team} placeholder="Team" name="team" />                         
                    </div>
                    <div>
                        <Select options={ocupation} placeholder="Ocupation" name="ocupation" />
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