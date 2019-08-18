import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import Failed from '../failed';
import { Col, Row, Form, FormGroup, Collapse, Button } from 'reactstrap';
import Input from '../inputs';
import { Category, Importance, Status } from '../utils/consts';
import Loading from '../loading';
import Pagination from '../utils/Pagination';

class TicketsTemplate extends Component { 
    constructor(){
       super();
       this.filterSearch = this.filterSearch.bind(this);
       this.toggle = this.toggle.bind(this);
       this.onChangePage = this.onChangePage.bind(this);
       this.state = {
            tickets: [],
            pageOfTickets: [],
            error: '',
            loading: false,
            Deleted: false,
            collapse: false            
       }
    }

    getToken = () => {
        const token = localStorage.getItem("token_id") || sessionStorage.getItem("token_id");
        return token;
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    }    

    onChangePage = (pageOfTickets) => {
        this.setState({ pageOfTickets: pageOfTickets })
    }
    
    filterSearch = async (e) => {

        try {
            e.preventDefault(); 
            const { target } = e;

            this.setState({
                loading: true
            });

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
                Importance: target.filterImportance.value,
                Status: target.filterState.value
            }

            const response = await Axios.post("http://localhost:2000/api/tickets/filter", query, config);
            const { tickets } = response.data;

            this.setState({
                tickets: [...tickets],
                pageOfTickets: [...tickets],
                loading: false,
            });

        } catch(error) {
            console.log(error);
            this.setState({
                error: error.message,
                loading: false              
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
            
            await Axios.delete("http://localhost:2000/api/tickets/deleteTicket/" + id, config);

            this.loadData();
    
        } catch (error) {
            this.setState({
                error: error.message
            });
        }
    }

    loadData = async () => {
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
    
            const response = await Axios.get("http://localhost:2000/api/tickets/getTickets", config);  
            const { tickets } = response.data;

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
        const { loading, error, tickets, pageOfTickets } = this.state;         

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
                <div>
                    <div className="tableOptions">
                        <Button onClick={this.toggle}>
                            <FontAwesomeIcon icon={faSearch} size="sm" />
                        </Button>
                        <Link to="/create" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faPlus} size="sm" />
                        </Link>
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
                                        <Select options={[0]} placeholder="Author" name="filterOwner" isDisabled={true} className="inputSelects"/>
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
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageOfTickets.map(ticket => 
                            <tr key={ticket._id}>
                                <td scope="row">{ticket.FilterID}</td>
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
                                <td>{ticket.Status}</td>
                                <td>
                                    <div className="d-flex icons">
                                        <div>
                                            <Link to={
                                            { 
                                                pathname: '/view',
                                                state: { ID: ticket._id }
                                            }} className="linkColor">
                                                <FontAwesomeIcon icon={faEye} size="sm" />
                                            </Link>                                            
                                        </div>
                                        <div>
                                            <Link to={
                                            { 
                                                pathname: '/edit',
                                                state: { ID: ticket._id }
                                            }} className="linkColor">
                                                <FontAwesomeIcon icon={faEdit} size="sm" />
                                            </Link>                                            
                                        </div>
                                        <div>
                                            <button className="nonButton" onClick={(e) => this.deleteTicket(ticket._id, e)}>
                                                <FontAwesomeIcon icon={faTrash} size="sm" />
                                            </button>                                            
                                        </div>
                                    </div>
                                </td>                                
                            </tr>)}
                        </tbody>
                    </table> 
                    <Pagination items={tickets} onChangePage={this.onChangePage}/> 

                </div>
            )
        }   
    }
}


export default TicketsTemplate;