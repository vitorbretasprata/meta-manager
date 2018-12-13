import React from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../main/AuthContext'

export default () => (
    <header>
        <AuthConsumer>
            {(context) => (
                <div className="container">
                    <nav className="navbar navbar-dark bg-dark">                        
                        <Link to="/home" className="navbar-brand button">Home</Link>

                        {!!context.isAuth ? (
                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={context.logout}>Logout</button>                        
                        ) : (
                            <Link to="/login" class="btn btn-outline-success my-2 my-sm-0">Login</Link>
                        )}                                               
                    </nav>        
                </div>                
            )}
        </AuthConsumer>
    </header>
)
