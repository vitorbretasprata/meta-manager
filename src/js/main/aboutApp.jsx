import React, { Component } from 'react';
import AboutTemplate from '../components/templates/aboutTemplate';
import EncapsulationHeader from './encapusationHeader';

class AboutApp extends Component {
    
    render(){    
        return (
            <EncapsulationHeader>
                <AboutTemplate/> 
            </EncapsulationHeader>
        )                  
    }
}

export default AboutApp;