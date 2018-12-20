import React, { Component } from 'react'
import { AnchorLink, AnchorElement, ScrollPanel } from "react-spy-scroll";
import Axios from 'axios'

const URL = 'http://localhost:2000/api/tickets/getTickets'

class DashboardTemplate extends Component {
    constructor(){
        super();
        this.state = {
            tickets: []
        }
    }



    render(){
        Axios.get(URL).then((respTickets)=> {
            this.setState({
                tickets: respTickets
            })
        })


        return (
            <div className="container-fluid">
                <div className="row">
                    <section className="col-sm-9">
                    <ScrollPanel className="hidden-scrollbar"
                    style={{ backgroundColor: "white", height: 600, overflow: "scroll" }}
                    >
                    <ul>
                        {this.state.tickets.map((ticket, i) => {
                          <li key={i}>{ticket.Name}</li>  
                        })}
                        
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