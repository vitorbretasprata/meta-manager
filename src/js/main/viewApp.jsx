import React, { Component } from 'react';
import ViewTemplate from '../components/templates/viewTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import Failed from '../components/failed'
import SideBar from './sideBar';

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
            textComment: "",
            Deleted: false,
            open: false
        };

    }

    _getToken = () => {
        const token = localStorage.getItem("token_id") || sessionStorage.getItem("token_id");
        return token;
    }

    deleteTicket = async (e) => { 
        try {
            e.preventDefault();

            const { ID } = this.props.location.state; 
            const token = this._getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            this.setState({
                Loading: true 
            });
            
            await Axios.delete(process.env.MAIN_DELETE_TICKET + ID, config);

            this.setState({
                Loading: false,
                Deleted: true,
            });
    
        } catch (error) {
            this.setState({
                Error: error.message,
                Loading: false
            });
        }
    }

    open = (e) => {
        e.preventDefault();
        this.setState({
            open: !this.state.open,
            textComment: ""
        });
    }

    handleText = (e, value) => {
        this.setState({
            [value]: e.target.value
        });
    }

    saveComment = async(e) => {
        e.preventDefault();
        const { ID } = this.props.location.state; 

        const token = this._getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        } 

        const { textComment } = this.state;
        
        this.setState({
            open: false,
            textComment: ""
        });

        await Axios.put(process.env.MAIN_COMMENT + ID, { Description:  textComment }, config);

        this.getList();        
    }

    formatDate = (date, timeToo = false) => {
        let formatedDate = date.split('T').shift().split('-').reverse().join('/');

        if(timeToo){  
            let formatedHour = date.split('T').pop().split('.').shift();

            formatedDate = `${formatedDate} ${formatedHour}`;
        } 
        return formatedDate;
    }

    getList = async() => {
        try {

            const { ID } = this.props.location.state;  

            const token = this._getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        
            const response = await Axios.get(process.env.MAIN_TICKET + ID, config);
    
            const { ticket } = response.data;
            const { Comments } = response.data.ticket;
    
            this.setState({
                Comments: [...Comments],
                Title: ticket.Title,
                Client: ticket.Client,
                Author: ticket.Author,
                Description: ticket.Description,
                DateCreated: ticket.DateCreated,
                Importance: ticket.Importance,
                Status: ticket.Status,
                Term: ticket.Term,
                Comments: ticket.Comments,
                Category: ticket.Category,
                Loading: false
            });  

        } catch(error) {
            console.log(error)
            this.setState({
                Error: error.message,
                Loading: false
            });
        }           
    }

    componentDidMount(){
        this.getList();
    }


    render(){
        const val = this.state;
        const DateCreatedFormated = this.formatDate(val.DateCreated);
        const TermFormated = this.formatDate(val.Term);

        if(val.Error){
            return (
                <SideBar>
                    <Failed message={val.Error} />
                </SideBar>               
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
                const dateComment = this.formatDate(UserComment.Comment.DateCreated, true);

                return (
                    <div className="form-group">
                        <div className="authorComment">{UserComment.Comment.User}</div> 
                        <div className="commentComent">{UserComment.Comment.Description}</div>
                        <div className="d-flex justify-content-end">{dateComment}</div>
                        <hr/>
                    </div>
                )    
            });
            
            return (
                <SideBar>
                    <ViewTemplate            
                    titleTicket={val.Title}
                    importanceTicket={val.Importance}
                    authorTicket={val.Author}
                    clientTicket={val.Client}
                    termTicket={TermFormated}
                    dateTicket={DateCreatedFormated}
                    stateTicket={val.Status}
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
                    textComment={val.textComment}
                    handleComment={e => this.handleText(e, "textComment")}
                    />
                </SideBar>                
            )
        }

        
    }
}

export default ViewApp;