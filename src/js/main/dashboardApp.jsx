import React, { Component } from 'react'
import DashBoardTemplate from '../components/templates/dashboardTemplate'
import SideBar from './sideBar';

class DashBoardApp extends Component{
    render(){
        return(
            <SideBar>
                <DashBoardTemplate />
            </SideBar>
        );
    }
}

export default DashBoardApp;