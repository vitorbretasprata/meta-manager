import React, { Component } from 'react';
import ViewTemplate from '../components/templates/viewTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import Error from '../components/error'
import { TICKET, DELETETICKET, ADDCOMMENT } from '../components/utils/consts'

class ViewApp extends Component {
    constructor(){
        super();
        this.deleteTicket = this.deleteTicket.bind(this); 
        this.open = this.open.bind(this);
        this.saveComment = this.saveComment.bind(this);

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
            Category: '',
            Comments: [],
            Loading: true,
            Deleted: false,
            open: false
        };

    }

    deleteTicket(e){
        const { ID } = this.props.location.state; 
        e.preventDefault();
        this.setState({
            Loading: true 
        }, () => {
            Axios.delete(`${DELETETICKET}/${ID}`).then(res => {
                console.log(res);
                this.setState({
                    Deleted: true
                })
            }).catch(err => {
                this.setState({
                    Error: err
                })
            })
        })     
    }

    open(e){
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
    }

    saveComment(e){
        e.preventDefault();
        const { ID } = this.props.location.state;        
        Axios.put(`${ADDCOMMENT}/${ID}`, 
        {            
            Description: e.target.newComment.value,
            User: "Vitor"
        }).then(res => {
            console.log(res);    
        })
    }

    getList(){
        const { ID } = this.props.location.state;        
        
        Axios.get(`${TICKET}/${ID}`).then(res => {
            console.log(res.data);
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
                Comments: res.data.Ticket.Comments,
                Category: res.data.Ticket.Category,
                Loading: false
            }, console.log(this.state.Comments));
        }).catch(err => {
            this.setState({
                Error: err,
                Loading: false
            })
        });
    }

    componentDidMount(){
        this.getList();
    }


    render(){
        const val = this.state;
        if(val.Error){
            return (
                <Error errorMessage={val.Error} />
            )
        } else if(val.Deleted){
            return (
                <Redirect to={{
                    pathname: '/dashboard',
                    state: {
                        Deleted: val.Deleted
                    }
                }} />
            )
        } else {
            const Comments = this.state.Comments.map(UserComment => {
                return (
                    <div className="form-group">
                        <div className="authorComment">{UserComment.Comment.User}</div> 
                        <div className="commentComent">{UserComment.Comment.Description}</div>
                        <div className="d-flex justify-content-end">{UserComment.Comment.DateCreated}</div>
                        <hr/>
                    </div>
                )
    
            });
            
            return (
                <ViewTemplate             
                titleTicket={val.Title}
                importanceTicket={val.Importance}
                authorTicket={val.Author}
                clientTicket={val.Client}
                termTicket={val.Term}
                dateTicket={val.DateCreated}
                stateTicket={val.State}
                descriptionTicket={val.Description}
                commentsTicket={Comments}
                deleteTicket={this.deleteTicket}
                addComment={this.open}
                isOpen={this.state.open}
                newComment={this.saveComment}
                categoryTicket={val.Category}
                linkToEdit={{ 
                    pathname: '/edit',
                    state: { ID: this.props.location.state.ID }
                }}
                />
            )
        }

        
    }
}

export default ViewApp;