import React, { Component } from 'react'
import { AnchorLink, AnchorElement, ScrollPanel } from "react-spy-scroll";
import Axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import Error from '../error'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ListContent from '../list';
import { Category, Importance, Status } from '../utils/consts';
import { TICKETS, USERS, DELETETICKET, FILTER  } from '../utils/consts'

class DashboardTemplate extends Component { 
    constructor(){
       super();
       this.filterSearch = this.filterSearch.bind(this);

       this.state = {
            tickets: [],
            error: '',
            loading: false,
            Deleted: false,
            users: [],
            ContentLoading: false           
       }
    }  
    
    loadUsers = () => {
        Axios.get(USERS).then(res => {            
            res.data.Users.map(user => {
                this.state.users.push(user);
            });
            this.setState({ loading: false });
        }).catch(err => {
            this.setState({
                error: `${err}`,
                loading: false             
            });
        });
    }   
    
    filterSearch(e){
        e.preventDefault();        
        const value = e.target;           
        
        this.setState({
            tickets: [],
            ContentLoading: true            
        }, () => {
            Axios.post(FILTER, 
            {      
                ID: value.filterID.value,
                Title: value.filterTitle.value,
                Client: value.filterClient.value,
                Category: value.filterCategory.value,
                Author: value.filterOwner.value,
                Importance: value.filterImportance.value,
                State: value.filterState.value
                
             }).then(res => {
                console.log(res.data);
                res.data.Ticket.map(ticket => {
                    this.state.tickets.push(ticket);                    
                });
                this.setState({
                    error: false,
                    ContentLoading: false
                });      
            }).catch(err => {
                this.setState({
                    error: `${err}`,
                    ContentLoading: false              
                });
            });
        });        
    }

    deleteTicket(id, e){ 
        e.preventDefault();      
        this.setState({
            Loading: true 
        }, () => {
            Axios.delete(`${DELETETICKET}/${id}`).then(res => {
                this.loadData();
            }).catch(err => {
                this.setState({
                    Error: err
                });
            });
        });
    }

    loadData = () => {
        this.setState({
            tickets: [],
            loading: true
        }, () => {
            Axios.get(TICKETS).then(res => {       
                res.data.Tickets.map(ticket => {
                    this.state.tickets.push(ticket);
                });
                this.setState({
                    error: false,
                    loading: false
                });      
            }).catch(err => {
                this.setState({
                    error: `${err}`,
                    loading: false             
                });
            });
        });    
    }

    componentDidMount(){
        this.loadData();
        this.loadUsers();        
    }              

    render(){
        if(this.props == undefined){
            const teste = this.props;
            console.log(teste); 
        }
            
        const { loading, error, tickets, users, ContentLoading } = this.state;
        const filterOwner = [users.map(user => { 
            return {
                value: user._id, label: user.Name
            }     
        })];  

        if(loading){
            return <p><strong>Loading...</strong></p>
        } else if(error){
            return(
                <p>
                    <Error errorMessage={error} />
                    <button onClick={this.loadData} className="btn btn-black">Try again</button>
                </p>
            )
        } else {
            return (
                <div className="container  container-fluid containerMargin">
                    
                    <div className="row marginRow justify-content-between">
                        <section className="col-lg-8 col-12">
                            <h2 className="paddingTitle">Tickets</h2>
                            <hr/>
                            <Form onSubmit={this.filterSearch}>    
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Link to='/create' className="btn btn-dark">
                                                New Ticket
                                            </Link>   
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <input type="number" id="filterID" className="form-control" name="filterID" placeholder="Ticket ID"/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <input type="text" id="filterTitle" className="form-control" name="filterTitle" placeholder="Title"/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <input type="text" id="filterClient" className="form-control" name="filterClient" placeholder="Client"/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Select options={Category} placeholder="Category" name="filterCategory" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Select options={filterOwner[0]} placeholder="Author" name="filterOwner" />
                                        </FormGroup>
                                    </Col>  
                                    <Col md={3}>
                                        <FormGroup>
                                            <Select options={Importance} placeholder="Importance" name="filterImportance" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Select options={Status} placeholder="State" name="filterState" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>                                    
                                            <input type="submit" className="btn btn-dark" value="Search"/>                               
                                        </FormGroup>
                                    </Col>                         
                                </Row>                                                                        
                            </Form>                             
                            <ScrollPanel className="hidden-scrollbar"
                            style={{ backgroundColor: "white", height: 300, width: "auto", padding: "0 3px", marginTop: 25, marginBottom: 20, border: "0.5px solid gray", overflow: "auto" }}
                            >
                                <ListContent isLoading={ContentLoading}>
                                    <ul className="list-group list-group-flush paddingList">
                                        {tickets.map(ticket => <li key={ticket._id} className="list-group-item">
                                            <div className="gridContent">
                                                <div>
                                                    {ticket.FilterID}
                                                </div>
                                                <div id="overflowTitle">
                                                    <Link to={
                                                    { 
                                                        pathname: '/view',
                                                        state: { ID: ticket._id }
                                                    }} className="linkColor">{ticket.Title}
                                                    </Link>
                                                </div> 
                                                <div className="marginRow">
                                                    {ticket.Category}
                                                </div>
                                                <div className="marginRow">
                                                    {ticket.State}
                                                </div>                               
                                                <div>
                                                    <div className="icons d-flex justify-content-around">
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
                                                            <button className="nonButton" onClick={(e) => this.deleteTicket(ticket._id, e)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>                                            
                                                        </div>
                                                    </div>                            
                                                </div>
                                            </div>
                                        </li>)}
                                    </ul>
                                </ListContent>                        
                            </ScrollPanel>              
                        </section>
                        
                        <aside className="col-lg-3 d-none d-sm-block d-md-block">
                            <div className="usersSpace">
                                <div className="userTitle">
                                    <h2>Users</h2>
                                </div>
                                <hr/>
                                <div>
                                <ul class="list-group">
                                    {users.map(user => <li class="list-group-item" key={user._id}>{user.Login}</li>)}        
                                </ul>
                                    
                                </div>
                            </div>                        
                        </aside>
                    </div>        
                </div>
            )
        }
               
        
    }
}


export default DashboardTemplate;