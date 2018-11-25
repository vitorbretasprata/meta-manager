import React from 'react';
import Input from './inputs';
import Button from './button';

const LoginTemplate = ({ sourcePathImage, size, loginFunc }) => (    
    <div className="loginTemplate">
        <form onSubmit={loginFunc}>
            <div>
                <img src={sourcePathImage} width={size} height={size}/>
            </div>
            <Input type="email" text="Email Address" placeholder="Please enter your Email" />
            <Input type="password" text="Password" placeholder="Please enter your Password"/>
            <div className="form-group row">
                <Button type="submit"
                 divClass="col-sm-10"
                 buttonClass="btn btn-dark"
                 textButton="Submit"/>                
            </div>
        </form>
    </div>    
)

export default LoginTemplate