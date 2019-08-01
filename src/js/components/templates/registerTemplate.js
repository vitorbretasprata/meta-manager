import React from 'react';
import Input from '../inputs';
import { Link } from 'react-router-dom';
import Failed from '../failed';
import ReactLoading from 'react-loading';
import FormError from "../utils/formError";

const registerTemplate = ({ registerUser, registerCompany, failed, failedMessage, showUser, showCompany, classUser, classCompany, visibilityCompany, visibilityUser, isLoading, 
    handleFirstNameUser, handleLastNameUser, handleEmailUser, handleLoginUser, handlePasswordUser, handleConfirmUser,
    handleFirstNameCompany, handleLastNameCompany, handleEmailCompany, handleLoginCompany, handlePasswordCompany, handleConfirmCompany,
    userFirstName, userLastName, userEmail, userLogin, userPassword, userConfirm,
    companyFirstName, companyLastName, companyEmail, companyLogin, companyPassword, companyConfirm,
    userFirstNameValid, userLastNameValid, userEmailValid, userLoginValid, userPasswordValid, userConfirmValid,
    userFirstNameError, userLastNameError, userEmailError, userLoginError, userPasswordError, userConfirmError,
    companyFirstNameValid, companyLastNameValid, companyEmailValid, companyLoginValid, companyPasswordValid, companyConfirmValid,
    companyFirstNameError, companyLastNameError, companyEmailError, companyLoginError, companyPasswordError, companyConfirmError }) => (
    <div className="centerDiv">
        {!!failed && <Failed message={failedMessage}/>}    
        
        <div id="main">
            <div className='tab-btn'>
                <a href="#" className={classUser} onClick={showUser}>User</a>
                <a href="#" className={classCompany} onClick={showCompany}>Company</a>
            </div>
                
            {!!visibilityUser &&                 
                <form onSubmit={registerUser} method='POST' noValidate className="form-container">
                    <div className="alignContent">
                        <p>User</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="First Name" id="firstNameRegister" name="firstName" handleChange={handleFirstNameUser} value={userFirstName}/>
                            <FormError isError={!userFirstNameValid} errorMsg={userFirstNameError} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="Last Name" id="lastNameRegister" name="lastName" handleChange={handleLastNameUser} value={userLastName}/>
                            <FormError isError={!userLastNameValid} errorMsg={userLastNameError} />
                        </div>    
                    </div>                
                    <Input type="email" placeholder="Email Address" id="emailRegister" name="email" handleChange={handleEmailUser} value={userEmail}/> 
                    <FormError isError={!userEmailValid} errorMsg={userEmailError} />
                    <Input type="text" placeholder="Login Name" id="loginRegister" name="login" handleChange={handleLoginUser} value={userLogin}/> 
                    <FormError isError={!userLoginValid} errorMsg={userLoginError} />  
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Password" id="passwordRegister" name="password" handleChange={handlePasswordUser} value={userPassword}/> 
                            <FormError isError={!userPasswordValid} errorMsg={userPasswordError} /> 
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Confirm Password" id="passwordConf" name="confirm" handleChange={handleConfirmUser} value={userConfirm}/>
                            <FormError isError={!userConfirmValid} errorMsg={userConfirmError} />
                        </div>    
                    </div>                 
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button className="btn btn-dark loginButton" type="submit">
                                {isLoading ? <ReactLoading type="spin" id="loading" color="white" height={40} width={40}/> : "Submit"}
                            </button>  
                        </div>                                                            
                    </div>  
                    <div className="alignContent">
                        <Link to="/login">Login</Link>
                    </div>          
                </form>
            } 

            {!!visibilityCompany &&                
                <form onSubmit={registerCompany} method='POST' noValidate className="form-container">
                    <div className="alignContent">
                        <p>Company</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="First Name" id="firstNameRegister" name="firstName" handleChange={handleFirstNameCompany} value={companyFirstName}/>
                            <FormError isError={!companyFirstNameValid} errorMsg={companyFirstNameError} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="text" placeholder="Last Name" id="lastNameRegister" name="lastName" handleChange={handleLastNameCompany} value={companyLastName}/>
                            <FormError isError={!companyLastNameValid} errorMsg={companyLastNameError} />
                        </div>    
                    </div>                
                    <Input type="email" placeholder="Email Address" id="emailRegister" name="email" handleChange={handleEmailCompany} value={companyEmail}/> 
                    <FormError isError={!companyEmailValid} errorMsg={companyEmailError} />
                    <Input type="text" placeholder="Company Name" id="loginRegister" name="login" handleChange={handleLoginCompany} value={companyLogin}/>  
                    <FormError isError={!companyLoginValid} errorMsg={companyLoginError} /> 
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Password" id="passwordRegister" name="password" handleChange={handlePasswordCompany} value={companyPassword}/>  
                            <FormError isError={!companyPasswordValid} errorMsg={companyPasswordError} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Input type="password" placeholder="Confirm Password" id="passwordConf" name="confirm" handleChange={handleConfirmCompany} value={companyConfirm}/>
                            <FormError isError={!companyConfirmValid} errorMsg={companyConfirmError} />
                        </div>    
                    </div>     
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button className="btn btn-dark loginButton" type="submit">
                                {isLoading ? <ReactLoading type="spin" id="loading" color="white" height={40} width={40}/> : "Submit"}
                            </button>  
                        </div>              
                    </div>  
                    <div className="alignContent">
                        <Link to="/login">Login</Link>
                    </div>          
                </form>
            }
        </div>                
    </div>    
)

export default registerTemplate;