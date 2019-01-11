import React, { Component } from 'react'
import { AnchorLink, AnchorElement, ScrollPanel } from "react-spy-scroll";
import Axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import Error from '../error'


const TICKETS = 'http://localhost:2000/api/tickets/getTickets'
const USERS = 'http://localhost:2000/api/auth/getUsers'
const DELETETICKET = 'http://localhost:2000/api/tickets/deleteTicket'

const ocupation = [
    { value: 'Manager', label: 'Manager' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Support', label: 'Support' }
  ];

class DashboardTemplate extends Component { 
    constructor(){
       super();
       this.filterSearch = this.filterSearch.bind(this);
       

       this.state = {
            tickets: [],
            error: '',
            loading: false,
            users: []
       }
    }  
    
    loadUsers = () => {
        Axios.get(USERS).then(res => {
            console.log(res.data);
            res.data.Users.map(user => {
                this.state.users.push(user);
            }, console.log(this.state.users));
            this.setState({ loading: false });
        }).catch(err => {
            this.setState({
                error: `${err}`,
                loading: false             
            });
        });
    }   
    
    filterSearch(){

    }

    deleteTicket(id){        
        this.setState({
            Loading: true 
        }, () => {
            Axios.delete(`${DELETETICKET}/${id}`).then(res => {
                console.log(res);
                this.setState({
                    Deleted: true
                });
            }).catch(err => {
                this.setState({
                    Error: err
                });
            });
        });
    }

    loadData = () => {
        this.setState({ loading: true })
        Axios.get(TICKETS).then(res => {            
            console.log(res.data.Tickets);
            res.data.Tickets.map(ticket => {
                this.state.tickets.push(ticket);
            }, console.log(this.state.tickets));
            this.setState({
                error: false
            });      
        }).catch(err => {
            this.setState({
                error: `${err}`,
                loading: false             
            });
        });
    }

    componentDidMount(){
        this.loadData();
        this.loadUsers();
    }              

    render(){ 
        
        const { loading, error, tickets, users } = this.state;
        const filterOwner = [users.map(user => { 
            return {
                value: user._id, label: user.Name
            }     
        })];       

        if(loading){
            return <p><strong>Loading...</strong></p>
        }

        if(error){
            return(
                <p>
                    <Error errorMessage={error} />
                    <button onClick={this.loadData} className="btn btn-black">Try again</button>
                </p>
            )
        } 
               
        return (
            <div className="container containerMargin">
                <div className="row marginRow justify-content-between">
                    <section className="col-auto">
                    <h2 className="paddingTitle">Tickets</h2>
                    <form onSubmit={this.filterSearch}>
                        <div className="dashButtons gridName containerMargin"> 
                            <div>
                                <input type="submit" name="search" value="Search" className="btn btn-dark"/>
                            </div>
                            <div>
                                <Link to='/create' className="btn btn-dark">
                                    Create new Ticket
                                </Link>
                            </div>
                        </div>                        
                        <div className="row justify-content-between containerMargin">
                            <div className="col">
                                <input type="text" id="filterTitle" className="inputForm" name="filterTitle" placeholder="Title"/>
                            </div>
                            <div className="col">
                                <input type="text" id="filterClient" className="inputForm" name="filterClient" placeholder="Client"/>
                            </div>
                            <div className="col">
                                <Select options={ocupation} placeholder="Occupation" name="filterOccupation" />
                            </div>
                            <div className="col">
                                <Select options={filterOwner[0]} placeholder="Owner" name="filterOwner" />
                            </div>                            
                        </div>
                        
                    </form>                             
                    <ScrollPanel className="hidden-scrollbar"
                    style={{ backgroundColor: "white", height: 300, width: 740,  marginTop: 25, marginBottom: 20, border: "0.5px solid gray", overflow: "auto" }}
                    >
                    <ul className="list-group list-group-flush paddingList">
                        {tickets.map(ticket => <li key={ticket._id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Link to={
                                    { 
                                        pathname: '/view',
                                        state: { ID: ticket._id }
                                    }} className="linkColor">{ticket.Title}
                                    </Link>
                                </div>                                
                                <div>
                                    <div className="icons d-flex justify-content-between">
                                        <div>
                                            <Link to={
                                            { 
                                                pathname: '/view',
                                                state: { ID: ticket._id }
                                            }} className="linkColor">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Link>                                            
                                        </div>
                                        <div>
                                            <Link to={
                                            { 
                                                pathname: '/edit',
                                                state: { ID: ticket._id }
                                            }} className="linkColor">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>                                            
                                        </div>
                                        <div>
                                            <button className="nonButton" onClick={() => this.deleteTicket(ticket._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>                                            
                                        </div>
                                    </div>                            
                                </div>
                            </div>
                        </li>)}
                    </ul>
                    </ScrollPanel>                   
                    
                    </section>
                    
                    <aside className="col-3">
                        <div className="usersSpace">
                            <div className="userTitle">
                                <h2>Users</h2>
                            </div>
                            <div >
                                {users.map(user => <div key={user._id} className="userName">{user.Name}</div>)}
                            </div>
                        </div>                        
                    </aside>
                </div>        
            </div>
        )
    }
}


export default DashboardTemplate;