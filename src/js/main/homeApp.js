import React, { Component } from 'react';
import HomeTemplate from '../components/templates/homeTemplate';
import Encapsulation from './Encapsulation';

class HomeApp extends Component {

    render(){       
                
        return(
            <Encapsulation>
                <HomeTemplate />
            </Encapsulation>           
        )
    }
}

export default HomeApp;