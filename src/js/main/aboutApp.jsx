import React, { Component } from 'react';
import AboutTemplate from '../components/templates/aboutTemplate';
import SideBar from './sideBar';

class AboutApp extends Component {
    
    render(){    
        return (
            <SideBar>
                <AboutTemplate/> 
            </SideBar>
        )                  
    }
}

export default AboutApp;