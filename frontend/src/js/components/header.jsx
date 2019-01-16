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
          collapsed: true
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
                    <Navbar className="navbar-dark bgHeader" expand="md">
                        <div className="container-fluid">
                            <Link to="/" className="navbar-brand button">Home</Link>
                            
                            <NavbarToggler onClick={this.toggle} className="mr-2" data-target/>
                            <Collapse isOpen={!this.state.collapsed} navbar>
                                <Nav>
                                    <NavItem>
                                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    </NavItem>
                                </Nav>                            
                                <Nav className="ml-auto" navbar> 
                                    {!!context.isAuthenticated() ? (
                                            <NavItem>
                                                <button class="btn btn-outline-success my-2 my-sm-0" onClick={context.logout}>Logout</button>
                                            </NavItem>                                                                    
                                        ) : (
                                            <div>
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret>
                                                    Sign up/Sign in
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                    <DropdownItem>
                                                        <Link to="/login" class="">Login</Link>
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem>
                                                        <Link to="/register" class="">Register</Link>
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
