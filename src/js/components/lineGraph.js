import React, { Component } from 'react';
import Chart from 'chart.js';
import Axios from 'axios';
import checkError from './utils/checkError';

class LineGraph extends Component {

    constructor() {
        super();
        this.state = {
            failed: true,
            messageError: '',
            months: {
                1: "Jan",
                2: "Fev",
                3: "Mar",
                4: "Apr",
                5: "May",
                6: "Jun",
                7: "Jul",
                8: "Ago",
                9: "Sept",
                10: "Oct",
                11: "Nov",
                12: "Dec"
            }              
            
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
            
            const quantity = await this.setGraph(checked.result);
            console.log(quantity);
            return quantity;

        } catch (error) {
            this.setState({
                failed: true,
                messageError: error.message
            })
        }       
    }

    setGraph = (tickets) => {
        let month = new Date().getMonth() + 1;
        let MonthValues = {};
        let arrMonthValues = [];
        let arrMonth = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dec"];
        let arrMonthNum = [];
        let arrMonthsSorted = [];
        let ct = 12;

        tickets.forEach(e => {
            MonthValues[e._id.month] = { 'result': e.result }
        });

        while(ct >= 1) {  

            if(!MonthValues[month]) {
                arrMonthValues.push(0);
            } else {
                arrMonthValues.push(MonthValues[month]['result']);
            }

            if(month == 1) {
                arrMonthNum.push(month);
                month = 12;
            } else {
                arrMonthNum.push(month);
                month--;
            }
            ct--;
        } 

        for(let i = 0; i < 12; i++) {
            month = arrMonth[arrMonthNum[i] - 1]
            if(month) {
                arrMonthsSorted.push(month);
            }
        }

        let firstMonth = arrMonthsSorted.pop();
        arrMonthsSorted.unshift(firstMonth);

        return {
            arrMonthValues: arrMonthValues.reverse(),
            arrMonthsSorted: arrMonthsSorted.reverse()
        }
    }
    
    componentDidMount() {
        const quantity = this.getQuantity();
        console.log(quantity)

        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: quantity.arrMonthsSorted,
                datasets: [
                    {
                        label: "Tickets Completed",
                        data: quantity.arrMonthValues,
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