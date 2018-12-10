import React from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../main/AuthContext'

export default () => (
    <header>
        <AuthConsumer>
            {(context) => (
                <div className="navbar navbar-dark bg-dark">
                    <nav className="container">                        
                        <Link to="/home" className="navbar-brand button">Home {context.state.isAuth}</Link>

                        {!!context.isAuth ? (
                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={context.logout}>Logout</button>                        
                        ) : (
                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={context.login}>Login</button>
                        )}                                               
                    </nav>        
                </div>                
            )}
        </AuthConsumer>
    </header>
)
