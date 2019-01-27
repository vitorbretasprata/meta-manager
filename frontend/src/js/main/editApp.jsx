import React, { Component } from 'react';
import EditTemplate from '../components/templates/editTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'; 
import EncapsulationHeader from './encapusationHeader';

const ALTERTICKET = 'http://localhost:2000/api/tickets/alterTicket'
const TICKET = 'http://localhost:2000/api/tickets/getTicket'

class EditApp extends Component {
    constructor(){
        super();

        this.saveEdition = this.saveEdition.bind(this);
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
            SuccessEdit: false,
            SuccessAdd: false
        };

    }

    componentDidMount(){ 
        if(this.props.location.state){
            const { ID } = this.props.location.state; 
            Axios.get(`${TICKET}/${ID}`).then(res => {
    
                res.data.Ticket.Comments.map(UserComment => {
                    this.state.Comments.push(UserComment)
                });
    
                this.setState({
                    Title: res.data.Ticket.Title,
                    Client: res.data.Ticket.Client,
                    Author: res.data.Ticket.Author,
                    Description: res.data.Ticket.Description,
                    DateCreated: res.data.Ticket.DateCreated,
                    Importance: res.data.Ticket.Importance,
                    State: res.data.Ticket.State,
                    Term: res.data.Ticket.Term,
                    Category: res.data.Ticket.Category,                     
                    Comments: res.data.Ticket.Comments,
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

    saveEdition(e){
        const { ID } = this.props.location.state; 
        const data = e.target;
        
        e.preventDefault();
        this.setState({
            Loading: true
        }, () => {
            Axios.put(`${ALTERTICKET}/${ID}`, 
            {
                Title: data.filterTitle.value,            
                Client: data.filterClient.value,
                Description: data.filterDescription.value,                
                Importance: data.filterImportance.value,
                State: data.filterStatus.value,
                Term: data.filterDate.value,
                Category: data.filterCategory.value
            }).then(res => {                
                this.setState({
                    Loading: false,
                    SuccessEdit: true
                });
                
            }).catch(err => {
                this.setState({
                    Loading: false,
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
        const { SuccessEdit } = this.state;
        const val = this.state;

        if(val.Error){
            return(
                <EncapsulationHeader>
                    <Error errorMessage={val.Error} />
                </EncapsulationHeader>
            )           
        } else if(SuccessEdit){
            return (
                <Redirect to={{
                    pathname: '/view',
                    state: { 
                        ID: this.props.location.state.ID,
                        SuccessEdit: true
                    }
                }} />
            )
        } else {
            return ( 
                <EncapsulationHeader>
                    <EditTemplate 
                    method="PUT"
                    editTicket={this.saveEdition}
                    titleTicket={val.Title}
                    importanceTicket={val.Importance}
                    authorTicket={val.Author}
                    clientTicket={val.Client}
                    termTicket={val.Term}                    
                    descriptionTicket={val.Description}    
                    cancelEdit={{ 
                        pathname: '/view',
                        state: { ID: this.props.location.state.ID }
                    }}
                    changeDate={this.handleDateChange}
                    selectDate={this.handleSelectedDate}
                    changeTitle={this.handleTitle}
                    changeClient={this.handleClient}
                    changeDesc={this.handleDesc}
                    selectedImportance={val.Importance}
                    selectedStatus={val.State}
                    selectedCategory={val.Category}
                    />
                </EncapsulationHeader>                                  
            )
        }
    }
}

export default EditApp;