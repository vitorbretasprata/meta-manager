import React, { Component } from 'react';
import ViewTemplate from '../components/templates/viewTemplate';
import Axios from 'axios';

const TICKET = 'http://localhost:2000/api/tickets/getTicket'
class ViewApp extends Component {
    constructor(){
        super();
        this.state = {
            Title: '',
            Client: '',
            Author: '',
            Description: '',
            DateCreated: '',
            Importance: '',
            State: '',
            Term: '',
            Error: '',
            Loading: false
        };

    }

    componentDidMount(){
        const { ID } = this.props.location.state;
        Axios.get(`${TICKET}/${ID}`).then(res => {
            this.setState({
                Title: '',
                Client: '',
                Author: '',
                Description: '',
                DateCreated: '',
                Importance: '',
                State: '',
                Term: ''
            });
        }).catch(err => {
            this.setState({
                Error: err
            })
        });
    };


    render(){
        return (
            <ViewTemplate linkToEdit='/'/>
        )
    }
}

export default ViewApp;