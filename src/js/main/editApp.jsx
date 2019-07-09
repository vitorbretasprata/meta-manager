import React, { Component } from 'react';
import EditTemplate from '../components/templates/editTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'; 
import SideBar from './sideBar';

class EditApp extends Component {
    constructor(){
        super();

        this.handleText = this.handleText.bind(this);
        this.checkInputTickets = this.checkInputTickets.bind(this);

        this.state = {            
            title: '',
            client: '',
            author: '',
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
            SuccessEdit: false,
            SuccessAdd: false
        };

    }

    componentDidMount(){ 
        this.loadTicket();           
    }

    _getToken = () => {
        const token = localStorage.getItem("token_id") || sessionStorage.getItem("token_id");
        return token;
    }

    loadTicket = async () => {

        try {
            if(this.props.location.state){
                const { ID } = this.props.location.state; 

                const response = await Axios.get("http://localhost:2000/api/tickets/getTicket/" + ID);
                const { ticket } = response.data;

                response.data.ticket.Comments.map(UserComment => {
                    this.state.Comments.push(UserComment)
                });

                this.setState({
                    title: ticket.Title,
                    client: ticket.Client,
                    description: ticket.Description,
                    importance: ticket.Importance,
                    status: ticket.Status,
                    term: ticket.Term,
                    category: ticket.Category,                     
                    Comments: ticket.Comments,
                    Loading: false
                });
            }

        } catch(error) {
            this.setState({
                Error: error.massage,
                Loading: false
            });
        }   
    }

    convertDate = (date) => {
        let newDate = date.split("T")[0].split("-").reverse().join("/");
        return newDate;
    }

    saveEdition = async () => {

        try {

            const { ID } = this.props.location.state; 
            const { title, client, description, importance, term, status, category } = this.state;
            const token = this._getToken();
            
            e.preventDefault();
    
            this.setState({
                Loading: true
            });


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
            
            await Axios.put("http://localhost:2000/api/tickets/editTicket/" + ID, body, config);
            
            this.setState({
                Loading: false,
                SuccessEdit: true
            });    

        } catch(error) {
            this.setState({
                Loading: false,
                Error: error.message
            });
        }               
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
        }, () => this.checkValidationTickets(this.state.userValid));
    }

    checkValidationTickets = (valid) => {
        if(valid.title && valid.description) {
            this.setState({
                formValid: true
            });
        } else {
            this.setState({
                formValid: false
            }, () => this.saveEdition());
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

    handleText = async (e, value) => {
        this.setState({
            [value]: e.target.value
        });
    }

    render(){        
        const { SuccessEdit } = this.state;
        const val = this.state;

        if(val.Error != ""){
            return(
                <SideBar>
                    <Error errorMessage={val.Error} />
                </SideBar>
            )           
        } else if(SuccessEdit){
            return (
                <Redirect to="/dashboard" />
            )
        } else {
            return ( 
                <SideBar>
                    <EditTemplate 
                        method="PUT"
                        editTicket={this.checkInputTickets}
                        titleTicket={val.Title}
                        importanceTicket={val.Importance}
                        authorTicket={val.Author}
                        clientTicket={val.Client}
                        termTicket={new Date(val.Term)}                    
                        descriptionTicket={val.Description}    
                        cancelEdit='/dashboard'
                        Title="Edit Ticket"
                        changeDate={e => this.handleDate(e)}
                        changeTitle={e => this.handleText(e, "Title")}
                        changeClient={e => this.handleText(e, "Client")}
                        changeDesc={e => this.handleText(e, "Description")}
                        changeStatus={e => this.handleSelect(e, 'Status')}
                        changeImportance={e => this.handleSelect(e, 'Importance')}
                        changeCategory={e => this.handleSelect(e, 'Category')}
                        selectedImportance={val.Importance}
                        selectedStatus={val.Status}
                        selectedCategory={val.Category}
                    />
                </SideBar>                                  
            )
        }
    }
}

export default EditApp;