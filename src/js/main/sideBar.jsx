import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons';

class SideBar extends Component {
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
                            <Link to="/create">
                                <FontAwesomeIcon icon={faNewspaper} size="2x"/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                            </Link>
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