import React from 'react';
import { Component } from 'react';
const Chart = require("chart.js");
// //chart stuff vvvvvv


// //chart stuff ^^^^


// did i do this right jonah? 
//vvvvv right I forgot about that
//not workin throwing me error on browser
// oh we also need to use super on props and add the constructor and pass in props, I believe

class Histogram extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [1, 2, 3, 5, 4, 3, 0]
                }]
            },
            // Configuration options go here
            options: {}
        });
    }
    render() {
        return (<div>
            <div className="chart" >
                <canvas id="myChart"></canvas>
            </div>
        </div>
        )
    }
    ;
}

export default Histogram;