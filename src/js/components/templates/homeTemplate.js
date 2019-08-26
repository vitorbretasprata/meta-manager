import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import FormError from "../utils/formError";
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../../main/AuthContext';
import { Collapse } from 'reactstrap';
import { FaLinkedin, FaGithub, FaMedium, FaStackOverflow } from 'react-icons/fa';
import { Link as Anchor } from "react-scroll";

const HomeTemplate = ({ toggle, collapsed, isScrolled, inputMessage, Msg,
     handleMessage, inputEmail, handleEmail, inputLast, handleLast, inputFirst, handleFirst,
     firstValid, firstError, lastValid, lastError, emailValid, emailError, messageError, messageValid, sendMessage, messageSent, dropToggle, classToggle }) => (
    <div className="home-page">
        <header className={isScrolled ? 'header-scrolled' : ''}>            
            <AuthConsumer>
                {(context) => (                                            
                    <div className="container">
                        <nav className={isScrolled ? 'nav-scrolled' : ''}>
                            <h1><Link to="/" className="brand">M<span>e</span>t<span>a</span></Link></h1>
                            <ul className={`nav-links ${collapsed}`}>                                 
                                <li className="animate-link">
                                    <Anchor activeClass="active-link" to="home" spy={true} smooth={true} offset={5} duration={500} delay={100}>
                                        Home
                                    </Anchor>                  
                                </li>

                                <li className="animate-link">
                                    <Anchor activeClass="active-link" to="services" spy={true} smooth={true} offset={5} duration={500} delay={100}>
                                        Services
                                    </Anchor>                  
                                </li>

                                <li className="animate-link">
                                    <Anchor activeClass="active-link" to="about" spy={true} smooth={true} offset={5} duration={500} delay={100}>
                                        About
                                    </Anchor>                  
                                </li>                                

                                <li className="animate-link">
                                    <Anchor activeClass="active-link" to="contact" spy={true} smooth={true} offset={5} duration={500} delay={100}>
                                        Contact
                                    </Anchor>                  
                                </li>                                
                                {!!context.simpleAuth() ? (
                                    <li>
                                        <a onClick={dropToggle}>
                                            {context.state.UserName} <FontAwesomeIcon icon={faSortDown} className="dropdown-arrow"/>
                                        </a>
                                        <div className={`sub-menu ${classToggle}`}>
                                            <Link to="/dashboard">Dashboard</Link>
                                            <button onClick={context.logout}>Log out</button>
                                        </div> 
                                    </li>                                    
                                ) : (
                                    <li>
                                        <a onClick={dropToggle}>
                                            Enter <FontAwesomeIcon icon={faSortDown} className="dropdown-arrow"/>
                                        </a>
                                        <div className={`sub-menu ${classToggle}`}>
                                            <Link to="/Login">Log in</Link>
                                            <Link to="/Register">Register</Link>
                                        </div>                                        
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

        <section className="section-intro" id="home">            
            <div className="content-intro">
                <div className="content-title">A simple application to manager tasks</div>
                <div className="content-description">
                    If you feel like managing your tasks, register now. It's free!!!
                </div>
                <div className="get-started">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
                       
        </section>
        <section className="section-content" id="services">
            <div className="container">
                <div className="title-content">
                    <span className="mark-title"></span>
                    <p>Services</p>
                </div>
                <div className="content-margin row">
                    <div className="col-sm-10 col-md-5 col-lg-5 service-options">
                        <div className="services-icon">
                            <FontAwesomeIcon icon={faUser} size={"6x"}/>
                        </div>
                        <div className="services-title">
                            <h2>User Account</h2>
                        </div>
                        <div className="services-desc">
                            <p>
                                An user accout permits that you create, edit, organize, archive and delete tickets.
                                You will only have access to the tickets that you creates.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-10 col-md-5 col-lg-5 service-options">
                        <div className="services-icon">
                            <FontAwesomeIcon icon={faBuilding} size={"6x"}/>
                        </div>
                        <div className="services-title">
                            <h2>Company Account</h2>
                        </div>
                        <div className="services-desc">
                            <p>
                                Create an company account to be able to create other
                                accounts. You will have accesss not only to the tickets that you creates,
                                but all the tickets that was creates by the accounts of your company.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <section className="section-content" id="about">
            <div className="container">
                <div className="title-content">
                    <span className="mark-title"></span>
                    <p>About</p>
                </div>
                <div className="content-margin row">
                    <div className="col-sm-10 col-md-5 col-lg-5">
                        <div className="about-image"></div>
                    </div>
                    <div className="col-sm-10 col-md-5 col-lg-5">
                        <div className="title-about">
                            <p>About us</p>
                        </div>
                        <div className="text-about">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Natus error deleniti dolores necessitatibus eligendi. 
                            Nesciunt repellendus ab voluptatibus. Minima architecto 
                            impedit eaque molestiae dicta quam. Cum ducimus. 
                            Culpa distinctio aperiam
                        </div>
                    </div>
                </div>

            </div>
        </section>         

        <section className="section-content padding" id="contact">
            <div className="container">
                <div className="title-content">
                    <span className="mark-title"></span>
                    <p>Contacts</p>
                </div>
                <div className="message-title">Send Message</div>
                {!!messageSent && <div className="message">{Msg}</div>}
                <div className="row">                                                   
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <FormError isError={!firstValid} errorMsg={firstError} /> 
                        <input type="text" placeholder="First Name" value={inputFirst} onChange={handleFirst} className="message-input" name="first"/>
                    </div>   
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <FormError isError={!lastValid} errorMsg={lastError} />
                        <input type="text" placeholder="Last Name" value={inputLast} onChange={handleLast} className="message-input" name="last"/> 
                    </div> 
                    <div className="col-sm-12">
                        <FormError isError={!emailValid} errorMsg={emailError} />
                        <input type="text" placeholder="Email Address" value={inputEmail} onChange={handleEmail} className="message-input" name="email"/>
                    </div>   
                    <div className="col-sm-12">
                        <FormError isError={!messageValid} errorMsg={messageError} /> 
                        <textarea rows="6" value={inputMessage} onChange={handleMessage} className="message-input message-text" name="message">
                        </textarea>
                    </div> 
                    <div className="col-sm-12 col-lg-2">
                        <button className="message-button" onClick={sendMessage}>
                            Send Message
                        </button>
                    </div>          
                </div>                    
            </div>
        </section>

        <footer>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-4">
                        <h2 className="footer-heading text-uppercase mb-4 weight">About me</h2>
                        <p>I am a simple programmer passionate with learning new things.</p>
                    </div>
                    <div className="col-md-3 ml-auto">
                        <h2 className="footer-heading text-uppercase mb-4 weight">Quick Links</h2>
                        <ul className="list-unstyled quick-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h2 className="footer-heading text-uppercase mb-4 weight">Professional Contacts</h2>
                        <p className="professional-links">
                            <a href="https://www.linkedin.com/in/vitor-prata-a899b16b/">
                                <FaLinkedin size="2em" />
                            </a>
                            <a href="https://github.com/vitorbretasprata">
                                <FaGithub size="2em" />
                            </a>
                            <a href="https://pt.stackoverflow.com/users/115436/vitor-prata">
                                <FaStackOverflow  size="2em" />
                            </a>
                            <a href="https://medium.com/@vitorbretasprata">
                                <FaMedium  size="2em"/>
                            </a>                            
                        </p>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="border-top pt-5">
                            <p>Copyright © 2019 All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>            
    </div>    
)

export default HomeTemplate;