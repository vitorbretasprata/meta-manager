import React, { Component } from 'react';
import Chart from 'chart.js';
import Axios from 'axios';
import checkError from './utils/checkError';

class LineGraph extends Component {

    constructor() {
        super();
        this.state = {
            failed: true,
            messageError: ''
        }
    }
    chartRef = React.createRef();

    _getToken = () => {
        return sessionStorage.getItem("token_id") || localStorage.getItem("token_id");
    }

    getQuantity = async () => {

        try {
            const token = this._getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
    
            const qtd = await Axios.get("http://localhost:2000/api/tickets/getQuantity", config);
    
            const checked = checkError(qtd);
    
            if (checked.code) {
                this.setState({
                    failed: true,
                    messageError: checked.message
                });
            }
    
            return checked;


        } catch (error) {
            this.setState({
                failed: true,
                messageError: error.message
            })
        }

        
    }
    
    componentDidMount() {
        const quantity = this.getQuantity();

        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March", "Apr", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Tickets Completed",
                        data: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }
    render() {
        return (
            <div className="graph-container">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default LineGraph;