import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../../main/AuthContext';
import { Collapse } from 'reactstrap';

const SubMenu = () => (
    <div className="sub-menu">
        <div><Link to="/Login">Log in</Link></div>
        <div><Link to="/Register">Register</Link></div>
    </div> 
)

const HomeTemplate = ({ toggle, collapsed, handleLeave, handleHover, subMenu }) => (
    <div className="home-page">
        <header>            
            <AuthConsumer>
                {(context) => (                                            
                    <div className="container">
                        <nav>
                            <h1><Link to="/" className="brand">M<span>e</span>t<span>a</span></Link></h1>
                            <ul className={`nav-links ${collapsed}`}>
                                <li className="animate-link"><a href="#">Home</a></li>
                                <li className="animate-link"><a href="#">Services</a></li>
                                <li className="animate-link"><a href="#">About</a></li>
                                <li className="animate-link"><a href="#">Donation</a></li>
                                <li className="animate-link"><a href="#">Contacts</a></li>
                                {!!context.simpleAuth() ? (
                                    <li onMouseLeave={handleLeave}>
                                        <a href="#" onMouseEnter={handleHover}>
                                            {context.userName} <FontAwesomeIcon icon={faSortDown} className="drop-arrow"/>
                                        </a>
                                        {!!subMenu && <SubMenu />}
                                    </li>                                    
                                ) : (
                                    <li onMouseLeave={handleLeave}>
                                        <a href="#" onMouseEnter={handleHover}>
                                            Enter <FontAwesomeIcon icon={faSortDown} className="drop-arrow"/>
                                        </a>
                                        {!!subMenu && <SubMenu />}
                                    </li>
                                )}                                
                            </ul>
                            <div className="collapse-nav" onClick={toggle}>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                        </nav>                        
                        
                        <Collapse isOpen={!collapsed} navbar>
                            
                        </Collapse>
                    </div>                            
                )}
            </AuthConsumer>
        </header>  

        <section className="content-intro">
            <div>A manager application</div>
            <div></div>
            <div>
                <Link to="/login">Get Started</Link>
                <Link to="/login">Register</Link>
            </div>
        </section>            
    </div>    
)

export default HomeTemplate;