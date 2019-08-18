import React, { Component } from 'react'
import DashBoardTemplate from '../components/templates/dashboardTemplate';
import SideBar from './sideBar';
import DashboardNavBar from '../components/dashboardNavBar';
import Axios from 'axios';

class DashBoardApp extends Component{
    constructor() {
        super();

        this.state = {
            newTicket: 0,
            completed: 0,
            active: 0,
            deadline: 0
        }    
    }

    _getToken = () => {
        const token = localStorage.getItem("token_id") || sessionStorage.getItem("token_id");
        return token;
    }

    getTicketsInfo = async () => {

        const token = this._getToken();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const info = await Axios.get('http://localhost:2000/api/tickets/getInfo', config);

        const { data } = info;

        this.setState({
            newTicket: data.news,
            completed: data.completed,
            active: data.active,
            deadline: data.deadline
        });
    }

    componentDidMount() {
        this.getTicketsInfo();
    }

    render(){

        const { newTicket, completed, active, deadline } = this.state;

        return(
            <div className="main-dashboard">
                <DashboardNavBar />                
                <SideBar
                    title="Dashboard"
                    dashboardClass="active-link"
                    ticketsClass=""
                 />

                <div className="dashboard-content">   
                    <DashBoardTemplate 
                        newTicket={newTicket}
                        completed={completed}
                        active={active}
                        deadline={deadline}
                    />
                </div>                
            </div>
        );
    }
}

export default DashBoardApp;