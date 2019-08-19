import React, { Component } from 'react';
import Chart from 'chart.js';
import Axios from 'axios';

class LineGraph extends Component {
    chartRef = React.createRef();


    getQauntity = async () => {
        const qtd = await Axios.get("");

        return qtd;
    }
    
    componentDidMount() {
        const quantity = this.getQauntity();

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