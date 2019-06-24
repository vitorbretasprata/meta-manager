import React, { Component } from 'react';
import AboutTemplate from '../components/templates/aboutTemplate';
import Encapsulation from './Encapsulation';

class AboutApp extends Component {
    
    render(){    
        return (
            <Encapsulation>
                <AboutTemplate/> 
            </Encapsulation>
        )                  
    }
}

export default AboutApp;