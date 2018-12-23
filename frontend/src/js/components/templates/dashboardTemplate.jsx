import React, { Component } from 'react'
import { AnchorLink, AnchorElement, ScrollPanel } from "react-spy-scroll";
import Axios from 'axios'

const URL = 'http://localhost:2000/api/tickets/getTickets'

class DashboardTemplate extends Component { 
    constructor(){
       super();
       this.state = {
            tickets: [],
            error: '',
            loading: false
       }
    }       
        

    loadData = () => {
        this.setState({ loading: true })
        Axios.get(URL).then(res => {
            console.log(res.data.Tickets);
            this.setState({
                [tickets]: res.data.Tickets.map(tickets => ({
                    ID: tickets._id,
                    Title: tickets.Title,
                    Description: tickets.Description,
                    Client: tickets.Client,
                    Author: tickets.Author,
                    Importance: tickets.Importance,
                    State: tickets.State,
                    Term: tickets.Term,
                    DateCreated: tickets.DateCreated
                })),
                loading: false,
                error: false
            }, console.log(this.state.tickets));      
        }).catch(err => {
            this.setState({
                error: `${err}`,
                loading: false
            });
        });
    }

    componentDidMount(){
        this.loadData();
    }              

    render(){ 
        
        const { loading, error, tickets } = this.state;

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
            <div className="container-fluid">
                <div className="row">
                    <section className="col-sm-8">
                    <ScrollPanel className="hidden-scrollbar"
                    style={{ backgroundColor: "white", height: 600, overflow: "scroll" }}
                    >
                    <ul className="list-group list-group-flush">
                        {tickets.map(ticket => <li key={ticket.ID} className="list-group-item">{ticket.Name}</li>)}
                        <li className="list-group-item">Teste</li>
                    </ul>
                    </ScrollPanel>
                    
                    </section>
                    <aside className="col-sm-3">

                    </aside>
                </div>        
            </div>
        )
    }
}


export default DashboardTemplate;