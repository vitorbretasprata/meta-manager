import React from 'react';

const LoginTemplate = ({ sourcePathImage, size, loginFunc }) => (    
    <div className="loginTemplate">
        <form>
            <span>
                <img src={sourcePathImage} width={size} height={size}/>
            </span>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" className="form-control" placeholder="Enter your Email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="form-control" placeholder="Enter your Password"/>
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary" onClick={loginFunc}>Submit</button>
                </div>
            </div>
        </form>
    </div>    
)

export default LoginTemplate