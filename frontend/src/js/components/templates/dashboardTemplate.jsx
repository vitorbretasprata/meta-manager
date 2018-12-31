import React, { Component } from 'react'
import { AnchorLink, AnchorElement, ScrollPanel } from "react-spy-scroll";
import Axios from 'axios';
import Input from '../inputs'
import Select from 'react-select';
import { AuthConsumer } from '../../main/AuthContext';
import { Link } from 'react-router-dom';


const TICKETS = 'http://localhost:2000/api/tickets/getTickets'
const USERS = 'http://localhost:2000/api/auth/getUsers'
const ocupation = [
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'support', label: 'Support' }
  ];



class DashboardTemplate extends Component { 
    constructor(){
       super();
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

        console.log(filterOwner[0])

        if(loading){
            return <p><strong>Loading...</strong></p>
        }

        if(error){
            return(
                <p>
                    There was an error loading the tickets: {error}
                    <button onClick={this.loadData} className="btn btn-black">Try again</button>
                </p>
            )
        } 
               
        return (
            <div className="container">
                <div className="row marginRow justify-content-between">
                    <section className="col-auto">
                    <h2>Tickets</h2>
                    <div className="form-control filters">
                        <div><Input type="text" id="filterTitle" name="filterTitle" placeholder="Title"/></div>
                        <div><Input type="text" id="filterTitle" name="filterTitle" placeholder="Title"/></div>
                        <div><Select options={ocupation} placeholder="Occupation" name="filterOccupation" /></div>
                        <div><Select options={filterOwner[0]} placeholder="Owner" name="filterOwner" /></div>
                    </div>
                    <ScrollPanel className="hidden-scrollbar"
                    style={{ backgroundColor: "white", maxHeight: 700, maxWidth: 700,  overflow: "auto" }}
                    >
                    <ul className="list-group list-group-flush">
                        {tickets.map(ticket => <li key={ticket._id} className="list-group-item"><Link to={
                            { 
                                pathname: '/view',
                                state: { ID: ticket._id }
                            }}>{ticket.Title}</Link></li>)}
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