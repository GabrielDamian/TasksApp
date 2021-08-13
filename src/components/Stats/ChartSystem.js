import React from 'react';
import {Line} from 'react-chartjs-2';
import './Stats.css'
const ChartSystem = ()=>{
    const chartData = {
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            borderColor: 'red',
            backgroundColor: 'red'
          },
          {
            label:'Populatasdaion',
            data:[
              54456,
              45645,
              345060,
              106519,
              23424,
              54645
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            borderColor: 'blue',
            backgroundColor: 'blue'
          }

        ]
      }
    return (
        <div className="chart-system-container">
            <Line 
                data={chartData}
                options={{
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                      }
                    },
                    maintainAspectRatio: false
                }
                }
            />
        </div>
    )
}

export default ChartSystem;
