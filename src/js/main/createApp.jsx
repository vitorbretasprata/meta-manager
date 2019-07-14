import React, { Component } from 'react';
import EditTemplate from '../components/templates/editTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'; 
import SideBar from './sideBar'

class CreateApp extends Component {
    constructor(){
        super();     
        this.saveAdd = this.saveAdd.bind(this);   
        this.handleSelect = this.handleSelect.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.checkInputTickets = this.checkInputTickets.bind(this);

        this.state = {            
            title: '',
            client: '',
            author: '',
            category: '',
            description: '',
            importance: '',
            status: '',
            term: new Date,
            ticketError: {
                title: '',
                description: ''
            },
            ticketValid: {
                title: false,
                description: false
            },
            formValid: false,
            Error: '',
            Comments: [],
            Loading: true,
            SuccessAdd: false,
        };
    }

    _getToken = () => {
        const token = localStorage.getItem("token_id") || sessionStorage.getItem("token_id");
        return token;
    }

    saveAdd = async () => {
        
        try {
            const { title, client, description, importance, term, status, category } = this.state;

            this.setState({
                Loading: true
            });

            const token = this._getToken();

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            const body = {
                Title: title,            
                Client: client,
                Description: description,                
                Importance: importance,
                Status: status,
                Term: term,
                Category: category 
            }

            await Axios.post("http://localhost:2000/api/tickets/createTicket", body, config);

            this.setState({
                Loading: false,
                SuccessAdd: true,
            });

        } catch(error) {
            console.log(error)
            this.setState({
                Loading: false,
                Error: error.message
            });
        }             
    }
    
    handleSelect = (e, value) => {
        this.setState({
            [value] : e.value
        });
    }

    handleDate = e => {
        this.setState({
            term: e
        });
    }

    handleText = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    checkInputTickets = (e) => {
        e.preventDefault();
        let { title, description, ticketError, ticketValid } = this.state;        

        if(title === '') {
            ticketError.title = 'Title is required';
            ticketValid.title = false;
        } else {
            ticketError.title = '';
            ticketValid.title = true;
        }   
        
        if(description === '') {
            ticketError.description = 'Description is required';
            ticketValid.description = false;
        } else {
            ticketError.description = '';
            ticketValid.description = true;
        }  
        
        this.setState({
            ticketError: ticketError,
            ticketValid: ticketValid            
        }, () => this.checkValidationTickets(this.state.ticketValid));
    }

    checkValidationTickets = (valid) => {
        if(valid.title && valid.description) {
            this.setState({
                formValid: true
            }, () => this.saveAdd());
        } else {
            this.setState({
                formValid: false
            });
        }
    }


    render(){        
        const { SuccessAdd } = this.state;
        const val = this.state;

        if(val.Error){
            return (
                <SideBar>
                    <Error errorMessage={val.Error} />
                </SideBar>
            )
        } else if(SuccessAdd){
            return (
                <Redirect to='/dashboard' />
            )
        } else  if(this.props.location.state == undefined){
            return (
                <SideBar>
                    <EditTemplate 
                        method="POST"
                        editTicket={this.checkInputTickets}
                        titleTicket={val.title}
                        importanceTicket={val.importance}
                        authorTicket={val.author}
                        clientTicket={val.client}
                        termTicket={val.term}
                        stateTicket={val.status}
                        Title="New Ticket"
                        descriptionTicket={val.description}                
                        cancelEdit='/dashboard'                    
                        changeDate={this.handleDate}
                        changeTitle={this.handleText}
                        changeClient={this.handleText}
                        changeDesc={this.handleText}
                        changeStatus={e => this.handleSelect(e, 'status')}
                        changeImportance={e => this.handleSelect(e, 'importance')}
                        changeCategory={e => this.handleSelect(e, 'category')}
                        descValid={val.ticketValid.description}
                        descError={val.ticketError.description}
                        titleError={val.ticketError.title}
                        titleValid={val.ticketValid.title}
                    />
                </SideBar>                
            )
        } 
    }
}

export default CreateApp;