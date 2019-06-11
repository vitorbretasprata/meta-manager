import React from 'react';
import Input from '../inputs';
import Button from '../button';
import SuccessRegistration from '../successRegistration';
import { Link } from 'react-router-dom';
import Failed from '../failed';
import ReactLoading from 'react-loading';

const registerTemplate = ({ registerUser, registerCompany, failed, failedMessage, showUser, showCompany, classUser, classCompany, visibilityCompany, visibilityUser, isLoading }) => (
    <div className="centerDiv">
        {!!failed && <Failed message={failedMessage}/>}    
        
        <div id="main">
            <div className='tab-btn'>
                <a href="#" className={classUser} onClick={showUser}>User</a>
                <a href="#" className={classCompany} onClick={showCompany}>Company</a>
            </div>
                
            {!!visibilityUser && <div className="content-register"> 
                <div className="alignTitleContent">
                    <h2>User</h2>
                </div>
                <form onSubmit={registerUser} method='POST'>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="First Name" id="firstNameRegister" name="firstName"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="Last Name" id="lastNameRegister" name="lastName"/>
                        </div>    
                    </div>                
                    <Input type="email" placeholder="Email Address" id="emailRegister" name="email"/> 
                    <Input type="text" placeholder="Login Name" id="loginRegister" name="login"/>   
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Password" id="passwordRegister" name="password"/>  
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Confirm Password" id="passwordConf" name="confirm"/>
                        </div>    
                    </div>                 
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button className="btn btn-dark loginButton" type="submit">
                                {isLoading ? <ReactLoading type="spin" id="loading" color="white" height={25} width={25}/> : "Submit"}
                            </button>  
                        </div>                                                            
                    </div>  
                    <div className="alignCenter">
                        <Link to="/login">Login</Link>
                    </div>          
                </form>
            </div>} 

            {!!visibilityCompany && <div className="other-register">
                <div className="alignTitleContent">
                    <h2>Company</h2>
                </div>
                <form onSubmit={registerCompany} method='POST' className="row">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="First Name" id="firstNameRegister" name="firstName"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="Last Name" id="lastNameRegister" name="lastName"/>
                        </div>    
                    </div>                
                    <Input type="email" placeholder="Email Address" id="emailRegister" name="email"/> 
                    <Input type="text" placeholder="Company Name" id="loginRegister" name="login"/>   
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Password" id="passwordRegister" name="password"/>  
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Confirm Password" id="passwordConf" name="confirm"/>
                        </div>    
                    </div>     
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button className="btn btn-dark loginButton" type="submit">
                                {isLoading ? <ReactLoading type="spin" id="loading" color="white" height={25} width={25}/> : "Submit"}
                            </button>  
                        </div>              
                    </div>  
                    <div className="alignCenter">
                        <Link to="/login">Login</Link>
                    </div>          
                </form>
            </div>}
        </div>                
    </div>    
)

export default registerTemplate;