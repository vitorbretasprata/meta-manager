import React, { Component } from 'react'
import TicketsTemplate from '../components/templates/ticketsTeamplate';
import SideBar from './sideBar';
import DashboardNavBar from '../components/dashboardNavBar';

class TicketsApp extends Component{
    render(){
        return(
            <div className="main-dashboard">
                <DashboardNavBar/>                
                <SideBar title="Tickets Table"
                dashboardClass=""
                ticketsClass="active-link"/>

                <div className="dashboard-content">   
                    <TicketsTemplate />
                </div>                
            </div>
        );
    }
}

export default TicketsApp;