import React, { Component } from 'react';
import EditTemplate from '../components/templates/editTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'; 
import SideBar from './sideBar';
import DashboardNavBar from '../components/dashboardNavBar';
import Error from '../components/error';

class EditApp extends Component {
    constructor(){
        super();

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

                const token = this._getToken();
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }

                const response = await Axios.get("http://localhost:2000/api/tickets/getTicket/" + ID, config);
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
            console.log(error)
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

        console.log(this.state)
        
        this.setState({
            ticketError: ticketError,
            ticketValid: ticketValid            
        }, () => this.checkValidationTickets(this.state.ticketValid));
    }

    checkValidationTickets = (valid) => {
        if(valid.title && valid.description) {
            this.setState({
                formValid: true
            }, () => this.saveEdition());
        } else {
            this.setState({
                formValid: false
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

    render(){        
        const { SuccessEdit } = this.state;
        const val = this.state;

        if(val.Error != ""){
            return(

                <div className="main-dashboard">
                    <DashboardNavBar />                
                    <SideBar
                        title="Edit Ticket"
                        dashboardClass=""
                        ticketsClass="active-link"
                    />

                    <div className="dashboard-content">   
                        <Error errorMessage={val.Error} />
                    </div>                
                </div>
            )           
        } else if(SuccessEdit){
            return (
                <Redirect to="/dashboard" />
            )
        } else {
            return ( 

                <div className="main-dashboard">
                    <DashboardNavBar />                
                    <SideBar
                        title="Edit Ticket"
                        dashboardClass=""
                        ticketsClass="active-link"
                    />

                    <div className="dashboard-content">   
                        <EditTemplate 
                            method="PUT"
                            editTicket={this.checkInputTickets}
                            titleTicket={val.title}
                            importanceTicket={val.importance}
                            authorTicket={val.author}
                            clientTicket={val.client}
                            termTicket={new Date(val.term)}                    
                            descriptionTicket={val.description}    
                            cancelEdit='/tickets'
                            changeDate={this.handleDate}
                            changeTitle={this.handleText}
                            changeClient={this.handleText}
                            changeDesc={this.handleText}
                            changeStatus={e => this.handleSelect(e, 'status')}
                            changeImportance={e => this.handleSelect(e, 'importance')}
                            changeCategory={e => this.handleSelect(e, 'category')}
                            selectedImportance={val.importance}
                            selectedStatus={val.status}
                            selectedCategory={val.category}
                        />
                    </div>                
                </div>                                 
            )
        }
    }
}

export default EditApp;