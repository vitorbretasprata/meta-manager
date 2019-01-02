import React, { Component } from 'react';
import ViewTemplate from '../components/templates/viewTemplate';

class ViewApp extends Component {
    constructor(){
        super();

    }


    render(){
        return (
            <ViewTemplate linkToEdit='/'/>
        )
    }
}

export default ViewApp;