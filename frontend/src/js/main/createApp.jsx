import React, { Component } from 'react';
import EditTemplate from '../components/templates/editTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'; 

const TICKET = 'http://localhost:2000/api/tickets/getTicket'
const ADDTICKET = 'http://localhost:2000/api/tickets/createTicket'

class CreateApp extends Component {
    constructor(){
        super();     
        this.saveAdd = this.saveAdd.bind(this);   
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectedDate = this.handleSelectedDate.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleClient = this.handleClient.bind(this);
        this.handleDesc = this.handleDesc.bind(this);

        this.state = {            
            Title: '',
            Client: '',
            Author: '',
            Description: '',
            DateCreated: '',
            Importance: '',
            State: '',
            Term: new Date,
            Error: '',
            Comments: [],
            Loading: true,
            SuccessAdd: false
        };

    }

    componentDidMount(){ 
        if(this.props.location.state){
            const { ID } = this.props.location.state; 
            Axios.get(`${TICKET}/${ID}`).then(res => {
        
                this.setState({
                    Title: res.data.Ticket.Title,
                    Client: res.data.Ticket.Client,
                    Author: res.data.Ticket.Author,
                    Description: res.data.Ticket.Description,
                    DateCreated: res.data.Ticket.DateCreated,
                    Importance: res.data.Ticket.Importance,
                    State: res.data.Ticket.State,
                    Term: res.data.Ticket.Term,                    
                    Loading: false
                });
            }).catch(err => {
                this.setState({
                    Error: err,
                    Loading: false
                })
            })
        }  
    }

    saveAdd(e){        
        const data = e.target;
        e.preventDefault();
        this.setState({
            Loading: true
        }, () => {
            Axios.post(`${ADDTICKET}`, 
            {    
                Title: data.filterTitle.value,            
                Client: data.filterClient.value,
                Author: "Vitor",
                Description: data.filterDescription.value,                
                Importance: data.filterImportance.value,
                State: data.filterStatus.value,
                Term: data.filterDate.value,
                Category: data.filterCategory.value             
            }).then(res => {
                console.log(res);
                this.setState({
                    Loading: false,
                    SuccessAdd: true
                });
            }).catch(err => {
                this.setState({
                    Error: err
                });
            });
        });      
    }
    
    handleDateChange(date){
        this.setState({
            Term: date
        });
    }

    handleSelectedDate(){

    }

    handleTitle(e){
        this.setState({
            Title: e.target.value
        });
    }

    handleClient(e){
        this.setState({
            Client: e.target.value
        });
    }

    handleDesc(e){
        this.setState({
            Description: e.target.value
        });
    }


    render(){        
        const { SuccessAdd } = this.state;
        const val = this.state;

        if(val.Error){
            return <Error errorMessage={val.Error} />
        } else if(SuccessAdd){
            return (
                <Redirect to={{
                    pathname: '/dashboard',
                    state: {    
                        SuccessAdd: true
                    }
                }} />
            )
        } else  if(this.props.location.state == undefined){
            return (
                <EditTemplate 
                method="POST"
                editTicket={this.saveAdd}
                titleTicket={val.Title}
                importanceTicket={val.Importance}
                authorTicket={val.Author}
                clientTicket={val.Client}
                termTicket={val.Term}
                dateTicket={val.DateCreated}
                stateTicket={val.State}
                descriptionTicket={val.Description}                
                cancelEdit='/dashboard'                    
                changeDate={this.handleDateChange}
                selectDate={this.handleSelectedDate}
                changeTitle={this.handleTitle}
                changeClient={this.handleClient}
                changeDesc={this.handleDesc}
                />
            )
        } 
    }
}

export default CreateApp;