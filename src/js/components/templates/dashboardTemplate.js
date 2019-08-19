import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faCalendar, faStickyNote, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import LineGraph from '../lineGraph';

const DashboardTemplate = ({ newTicket, completed, active, deadline}) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div className="dashboard-card-icon blue">
                            <FontAwesomeIcon icon={faPlus}  size="2x"/>
                        </div>
                        <p className="dashboard-card-category">New tickets</p>
                        <h3 className="dashboard-card-title">
                            {newTicket}
                        </h3>
                    </div>
                    <div className="dashboard-card-footer">
                        <div className="dashboard-stats">
                            <FontAwesomeIcon icon={faCalendar} size="1x" />
                            <p>Last month</p>
                        </div>
                    </div>
                </div>                
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div className="dashboard-card-icon green">
                            <FontAwesomeIcon icon={faStickyNote}  size="2x"/>
                        </div>
                        <p className="dashboard-card-category">Completed</p>
                        <h3 className="dashboard-card-title">
                            {completed}
                        </h3>
                    </div>
                    <div className="dashboard-card-footer">
                        <div className="dashboard-stats">
                            <FontAwesomeIcon icon={faCalendar} size="1x" />
                            <p>Last month</p>
                        </div>
                    </div>
                </div>                
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div className="dashboard-card-icon yellow">
                            <FontAwesomeIcon icon={faTicketAlt}  size="2x"/>
                        </div>
                        <p className="dashboard-card-category">Active</p>
                        <h3 className="dashboard-card-title">
                            {active}
                        </h3>
                    </div>
                    <div className="dashboard-card-footer">
                        <div className="dashboard-stats">
                            <FontAwesomeIcon icon={faCalendar} size="1x" />
                            <p>Last month</p>
                        </div>
                    </div>
                </div>                
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div className="dashboard-card-icon red">
                            <FontAwesomeIcon icon={faExclamationCircle}  size="2x"/>
                        </div>
                        <p className="dashboard-card-category">Deadline</p>
                        <h3 className="dashboard-card-title">
                            {deadline}
                        </h3>
                    </div>
                    <div className="dashboard-card-footer">
                        <div className="dashboard-stats">
                            <FontAwesomeIcon icon={faCalendar} size="1x" />
                            <p>Last month</p>
                        </div>
                    </div>
                </div>                
            </div>            
        </div>

        <LineGraph/>
    </div>
)

export default DashboardTemplate;