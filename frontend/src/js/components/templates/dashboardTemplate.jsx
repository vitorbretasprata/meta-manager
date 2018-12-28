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
    
    loadUsers = () => {

        
    }        

    loadData = () => {
        this.setState({ loading: true })
        Axios.get(URL).then(res => {            
            console.log(res.data.Tickets);
            res.data.Tickets.map(ticket => {
                this.state.tickets.push(ticket);
            }, console.log(this.state.tickets));
            this.setState({                
                loading: false,
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
            <div className="container">
                <div className="row marginRow justify-content-between">
                    <section className="col-auto">
                    <ScrollPanel className="hidden-scrollbar"
                    style={{ backgroundColor: "white", height: 300, width: 700, overflow: "auto" }}
                    >
                    <ul className="list-group list-group-flush">
                        {tickets.map(ticket => <li key={ticket._id} className="list-group-item">{ticket.Title}</li>)}
                    </ul>
                    </ScrollPanel>
                    
                    </section>
                    <section className="col">
                    </section>
                    <aside className="col-1">

                    </aside>
                </div>        
            </div>
        )
    }
}


export default DashboardTemplate;