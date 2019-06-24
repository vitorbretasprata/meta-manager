import React, { Component } from 'react'
import Axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faEye, faSearch, faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import Failed from '../failed'
import { Col, Row, Form, FormGroup, Collapse, Button } from 'reactstrap';
import ListContent from '../list';
import Input from '../inputs';
import { Category, Importance, Status } from '../utils/consts';
import Loading from '../loading';

class DashboardTemplate extends Component { 
    constructor(){
       super();
       this.filterSearch = this.filterSearch.bind(this);
       this.toggle = this.toggle.bind(this);
       this.nextPage = this.nextPage.bind(this);
       this.previousPage = this.previousPage.bind(this);
       this.state = {
            tickets: [],
            error: '',
            loading: false,
            Deleted: false,
            users: [],
            collapse: false,
            paginator: {
                currentPage: 1,
                maxPages: 1,
                maxResults: 0,
                total: 0
            }
       }
    }

    getToken = () => {
        const token = localStorage.getItem("token_id") || sessionStorage.getItem("token_id");
        return token;
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    nextPage = () => {
        this.setState({
            paginator: {
                ...this.state.paginator,
                currentPage: this.state.paginator.currentPage + 1
            }
        });

        const { paginator } = this.state;
        this.loadData(paginator);
    }

    previousPage = () => {
        this.setState({
            paginator: {
                ...this.state.paginator,
                currentPage: this.state.paginator.currentPage - 1
            }
        });

        const { paginator } = this.state;
        this.loadData(paginator);
    }
    
    filterSearch = async (e) => {

        try {
            e.preventDefault(); 
            const { target } = e;

            const token = this.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            const query = {
                ID: target.filterID.value,
                Title: target.filterTitle.value,
                Client: target.filterClient.value,
                Category: target.filterCategory.value,
                Author: target.filterOwner.value,
                Importance: target.filterImportance.value,
                State: target.filterState.value
            }

            const response = await Axios.post("http://localhost:2000/api/tickets/filter", query, config);

            const { tickets } = response.data;

            this.setState({
                ContentLoading: false,
                tickets: [...tickets]
            });

        } catch(error) {
            this.setState({
                error: error,
                ContentLoading: false              
            });
        }     
    }

    deleteTicket = async (id, e) => { 
        try {
            e.preventDefault();

            const token = this.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            this.setState({
                Loading: true 
            });
            
            await Axios.delete("http://localhost:2000/api/tickets/deleteTicket/" + id, config);
    
            this.loadData();
        } catch (error) {
            this.setState({
                error: error,
                loading: false
            });
        }
    }

    loadData = async (paginator = {}) => {
        try {
            this.setState({
                loading: true
            });

            const token = this.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
    
            const response = await Axios.post("http://localhost:2000/api/tickets/getTickets", paginator, config);
    
            const { tickets } = response.data;   

            console.log(tickets)

            this.setState({
                tickets: [...tickets],
                loading: false
            });

        } catch (error) {
            this.setState({
                loading: false,
                error: error.message
            });
        }
    }

    componentDidMount(){
        this.loadData();
    }              

    render(){            
        const { loading, error, tickets, paginator } = this.state;         

        if(loading){
            return <Loading type="spin" color="#000" size="10%" classname="centerDiv" />
        } else if(error){
            return(
                <p>
                    <Failed message={error} />
                    <button onClick={this.loadData} className="btn btn-black">Try again</button>
                </p>
            )
        } else {
            return (
                <div className="tablePosition">
                    <div className="tableOptions">
                        <div>
                            <Button onClick={this.toggle}>
                                <FontAwesomeIcon icon={faSearch} size="1x" />
                            </Button>
                        </div>
                        <div>
                            <Button onClick={this.previousPage} isDisabled={(paginator.currentPage <= 1) ? true : false}>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} size="1x"/>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={this.nextPage} isDisabled={(paginator.currentPage <= paginator.maxPages) ? true : false}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="1x"/>
                            </Button>
                        </div>

                        <div>
                            2 - 2 of 2
                        </div>
                    </div>
                    <Collapse isOpen={this.state.collapse}>
                        <Form onSubmit={this.filterSearch}>    
                            <Row form>                            
                                <Col md={2}>
                                    <FormGroup>
                                        <Input type="number" id="filterID" name="filterID" placeholder="Ticket ID"/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Input type="text" id="filterTitle" name="filterTitle" placeholder="Title"/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Input type="text" id="filterClient" name="filterClient" placeholder="Client"/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Select options={Category} placeholder="Category" name="filterCategory" className="inputSelects"/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup disabled>
                                        <Select options={[0]} placeholder="Author" name="filterOwner" isDisabled="true" className="inputSelects"/>
                                    </FormGroup>
                                </Col>  
                                <Col md={2}>
                                    <FormGroup>
                                        <Select options={Importance} placeholder="Importance" name="filterImportance" className="inputSelects"/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Select options={Status} placeholder="State" name="filterState" className="inputSelects"/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>                                    
                                        <input type="submit" className="btn btn-dark" value="Search"/>                          
                                    </FormGroup>                                
                                </Col>                                        
                            </Row>                                                                        
                        </Form>
                    </Collapse>                    
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">State</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => 
                            <tr key={ticket._id}>
                                <td scope="row">{ticket.filterID}</td>
                                <td>
                                    <Link to={
                                        { 
                                            pathname: '/view',
                                            state: { ID: ticket._id }
                                        }} className="linkColor">
                                        {ticket.Title}
                                    </Link>
                                </td>
                                <td>{ticket.Category}</td>
                                <td>{ticket.State}</td>
                                <td>
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
                                </td>                                
                            </tr>)}
                        </tbody>
                    </table>            
                </div>
            )
        }   
    }
}


export default DashboardTemplate;