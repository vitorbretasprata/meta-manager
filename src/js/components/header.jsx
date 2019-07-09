import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../main/AuthContext'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          collapsed: true,
          user: ''
        };
    }
    
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render(){        
        return (
            <header>
                <AuthConsumer>
                    {(context) => (                                            
                    <Navbar color="dark" dark expand="md">
                        <div className="container-fluid">
                            <Link to="/" className="linksButton homeButton">Home</Link>
                            
                            <NavbarToggler onClick={this.toggle} className="mr-2" data-target/>
                            <Collapse isOpen={!this.state.collapsed} navbar>
                                <Nav>
                                    <NavItem>
                                        <Link to="/dashboard" className="linksButton">Dashboard</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/about" className="linksButton">About</Link>
                                    </NavItem>
                                </Nav>                            
                                <Nav className="ml-auto" navbar> 
                                    {!!context.simpleAuth() ? (
                                            <div>
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret className="textColor">
                                                    Hello {context.state.UserName}
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                    <DropdownItem>
                                                        <a href="#" className="dropdownButton" onClick={context.logout}>Logout</a>
                                                    </DropdownItem>                                                                                                    
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>                                                                                
                                            </div>                                                                    
                                        ) : (                                                

                                            <div>
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret className="linksButton">
                                                        Sign up/Sign in
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                    <DropdownItem>
                                                        <Link to="/login" className="dropdownButton">Login</Link>
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem>
                                                        <Link to="/register" className="dropdownButton">Register</Link>
                                                    </DropdownItem>                                                
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>                                                                                
                                            </div>                                            
                                        )}                                                                           
                                </Nav>
                            </Collapse>
                        </div>                            
                    </Navbar>                     
                    )}
                </AuthConsumer>
            </header>
        )
    }
}

export default Header;
