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
            Comments: [],
            Loading: true
        };

    }

    componentDidMount(){
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
                Comments: res.data.Ticket.Comments,
                Loading: false
            }, console.log(this.state.Comments));
        }).catch(err => {
            this.setState({
                Error: err,
                Loading: false
            })
        })
    };


    render(){

        const Comments = this.state.Comments.map(UserComment => {
            return (
                    <div className="form-group">
                        <div>{UserComment.Comment.Author}</div> 
                        <div>{UserComment.Comment.Description}</div>
                        <div className="d-flex justify-content-end">{UserComment.Comment.DateCreated}</div>
                        <hr/>
                    </div>
                    )

        });

        console.log(Comments);
        
        const val = this.state;
        return (
            <ViewTemplate 
            linkToEdit='/'
            titleTicket={val.Title}
            importanceTicket={val.Importance}
            authorTicket={val.Author}
            clientTicket={val.Client}
            termTicket={val.Term}
            dateTicket={val.DateCreated}
            stateTicket={val.State}
            descriptionTicket={val.Description}
            commentsTicket={Comments}
            />
        )
    }
}

export default ViewApp;