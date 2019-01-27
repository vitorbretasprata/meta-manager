import React, { Component } from 'react'
import DashBoardTemplate from '../components/templates/dashboardTemplate'
import EncapsulationHeader from './encapusationHeader';

class DashBoardApp extends Component{
    render(){
        return (
            <EncapsulationHeader>
                <DashBoardTemplate />
            </EncapsulationHeader>           
        )
    }
}

export default DashBoardApp;