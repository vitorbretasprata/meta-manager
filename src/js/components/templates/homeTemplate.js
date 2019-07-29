import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faSortDown, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../../main/AuthContext';
import { Collapse } from 'reactstrap';

const SubMenu = () => (
    <div className="sub-menu">
        <div><Link to="/Login">Log in</Link></div>
        <div><Link to="/Register">Register</Link></div>
    </div> 
)

const HomeTemplate = ({ toggle, collapsed, handleLeave, handleHover, subMenu, isScrolled }) => (
    <div className="home-page">
        <header className={isScrolled ? 'header-scrolled' : ''}>            
            <AuthConsumer>
                {(context) => (                                            
                    <div className="container">
                        <nav className={isScrolled ? 'nav-scrolled' : ''}>
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

        <section className="section-intro">
            <div className="content-intro">
                <div className="content-title">An application to manager tasks</div>
                <div className="content-description">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                </div>
                <div className="get-started">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </section>
        <section className="section-content">
            <div className="container">
                <div className="title-content">
                    <span className="mark-title"></span>
                    <p>Services</p>
                </div>
                <div className="content-services">
                    <div className="service-options">
                        <div className="services-icon">
                            <FontAwesomeIcon icon={faUser} size={"6x"}/>
                        </div>
                        <div className="services-title">
                            <h2>User Account</h2>
                        </div>
                        <div className="services-desc">
                            <p>Create an user account to manage all your tickets.</p>
                        </div>
                    </div>
                    <div className="service-options">
                        <div className="services-icon">
                            <FontAwesomeIcon icon={faBuilding} size={"6x"}/>
                        </div>
                        <div className="services-title">
                            <h2>Company Account</h2>
                        </div>
                        <div className="services-desc">
                            <p>
                                Create an company account to be able to create other
                                account under the name of your caompany and manage all your tickets.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <section className="section-content">
            <div className="container">
                <div className="title-content">
                    <span className="mark-title"></span>
                    <p>About</p>
                </div>
                <div className="content-about">
                    <div></div>
                    <div></div>
                </div>

            </div>
        </section> 

        <section className="section-content">
            <div className="container">
                <div className="title-content">
                    <span className="mark-title"></span>
                    <p>Donation</p>
                </div>
                <div className="content-donation">
                    <div></div>
                    <div></div>
                </div>

            </div>
        </section> 

        <footer>
        </footer>            
    </div>    
)

export default HomeTemplate;