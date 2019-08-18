import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../main/AuthContext';


class DashboardNavBar extends Component {
    constructor() {
        super();
        this.dropToggle = this.dropToggle.bind(this);

        this.state = {
            dropVisible: ''
        }        
    }

    dropToggle = () => {
        const { dropVisible } = this.state;
        
        if(dropVisible === '') {
            this.setState({
                dropVisible: 'drop-toggle',
            });           
        } else {
            this.setState({
                dropVisible: '',
            }); 
        }
    }

    render () {

        const { dropVisible } = this.state;
        return (
            <div className="dashboard-main-nav">   
                <AuthConsumer>
                    {(context) => (
                        <ul>
                            <li>
                                <a onClick={this.dropToggle}>
                                    {context.state.UserName} <FontAwesomeIcon icon={faSortDown} className="dropdown-arrow"/>
                                </a>
                                <div className={`sub-menu ${dropVisible}`}>
                                    <Link to="/home">Home Page</Link>
                                    <button onClick={context.logout}>Log out</button>
                                </div> 
                            </li>                
                        </ul>
                    )}
                </AuthConsumer>              
            </div>
        )
    }
}

export default DashboardNavBar;
