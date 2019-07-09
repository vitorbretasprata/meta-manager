import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTable } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'reactstrap';

class SideBar extends Component {
    constructor(){
        super();

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render(){
        return (
            <div className="sideBarDiv">
                <div className="sideBar">
                    <ul className="sideBarIcons">
                        <li>
                            <Link to="/home">
                                <FontAwesomeIcon icon={faHome} size="2x"/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <FontAwesomeIcon icon={faTable} size="2x"/>
                            </Link>
                        </li>                        
                        <li>
                            <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="users" toggle={this.toggle}>
                                Coming soon!
                            </Tooltip>
                            <a href="#" id="users">
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="sideBarContent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default SideBar;