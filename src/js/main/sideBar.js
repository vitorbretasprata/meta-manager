import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDigitalTachograph, faUserAlt, faUsers, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

class SideBar extends Component {
    constructor(){
        super();

        this.toggle = this.toggle.bind(this);
        this.state = {
            collapsed: ''
        };
    }

    toggle = () => {
        const { collapsed } = this.state;

        if(collapsed === '') {
            this.setState({
                collapsed: 'nav-active',
            });           
        } else {
            this.setState({
                collapsed: '',
            }); 
        }
    } 

    render(){
        const { collapsed } = this.state;

        return (
            <div className="dashboard-sidebar">
                <div className="collapse-nav black" onClick={this.toggle}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="dashboard-title">
                    {this.props.title}
                </div>
                <div className={`dashboard-navbar ${collapsed}`}>
                    <div className="dashboard-navbar-title border-bottom">
                        Meta
                    </div>
                    <div className="dashboard-navbar-links">
                        <ul>
                            <li className={`dashboard-link ${this.props.dashboardClass}`}>
                                <Link to="/dashboard">
                                    <FontAwesomeIcon icon={faDigitalTachograph} size="lg" className="dashboard-navbar-icons"/> Dashboard
                                </Link>
                            </li>
                            <li className={`dashboard-link ${this.props.ticketsClass}`}>
                                <Link to="/tickets">
                                    <FontAwesomeIcon icon={faTicketAlt} size="lg" className="dashboard-navbar-icons"/> Ticktes
                                </Link>
                            </li>
                            <li className="dashboard-link inactive">
                                <Link to="/profile">
                                    <FontAwesomeIcon icon={faUserAlt} size="lg" className="dashboard-navbar-icons"/> Profile
                                </Link>
                            </li>                            
                            <li className="dashboard-link inactive"> 
                                <Link to="/users">
                                    <FontAwesomeIcon icon={faUsers} size="lg" className="dashboard-navbar-icons"/> Users
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>                    
        )
    }
}

export default SideBar;