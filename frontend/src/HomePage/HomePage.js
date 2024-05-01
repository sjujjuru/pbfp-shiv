import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import '../App.scss'; 
import '../index.scss'; 


const colors = [
    '#FFD1DC',
    '#AEC6CF',
    '#B7E4C7',
    '#836953',
    '#FFF1A7',
    '#FFB997',
    '#98FF98',
    '#D7A9E3',
    '#FFF4E3',
    '#A2D8D8',
    '#FF6B6B'
];

function BarChart() {
    const svgRef = useRef();

    useEffect(() => {
        axios.get('http://localhost:3002/budget')
            .then(response => {
                const data = response.data.myBudget;
                const svg = d3.select(svgRef.current);
                const width = 500;
                const height = 300;
                const margin = { top: 20, right: 30, bottom: 30, left: 40 };
                const innerWidth = width - margin.left - margin.right;
                const innerHeight = height - margin.top - margin.bottom;

                const x = d3.scaleBand()
                    .domain(data.map(d => d.title))
                    .range([0, innerWidth])
                    .padding(0.1);


                const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.budget)])
                    .nice()
                    .range([innerHeight, 0]);

                const g = svg.append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                g.selectAll('.bar')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('x', d => x(d.title))
                    .attr('y', d => y(d.budget))
                    .attr('width', x.bandwidth())
                    .attr('height', d => innerHeight - y(d.budget))
                    .attr('fill', (d, i) => colors[i % colors.length]);

                g.append('g')
                    .attr('class', 'x-axis')
                    .attr('transform', `translate(0,${innerHeight})`)
                    .call(d3.axisBottom(x));

                g.append('g')
                    .attr('class', 'y-axis')
                    .call(d3.axisLeft(y).ticks(null, 's'))
                    .append('text')
                    .attr('x', 2)
                    .attr('y', y(y.ticks().pop()) + 0.5)
                    .attr('dy', '0.32em')
                    .attr('fill', '#000')
                    .attr('font-weight', 'bold')
                    .attr('text-anchor', 'start')
                    .text('Budget');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <svg ref={svgRef} width={60} height={40}></svg>
    );
}

function HomePage() {
    const [budgetData, setBudgetData] = useState([]);
    const d3Container = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3002/budget')
          .then(response => {
            const data = response.data.myBudget;
            console.log('Data:', data);
            setBudgetData(data);
    
            // Destroy the previous Chart.js instance if it exists
            if (chartRef.current) {
              chartRef.current.destroy();
            }
    
            // Get the 2D rendering context of the canvas
            const ctx = document.getElementById('Chart').getContext('2d');
    
            // Create a new Chart.js pie chart
            chartRef.current = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: data.map(item => item.title),
                datasets: [{
                  data: data.map(item => item.budget),
                  backgroundColor: colors,
                }],
              },
            });
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);  


      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h1 className="card-title">Stay on track</h1>
                  <p className="card-text">
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                  </p>
                </div>
              </div>
            </div>
    
            <div className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h1 className="card-title">Alerts</h1>
                  <p className="card-text">
                    What if your clothing budget ended? You will get an alert. <mark className="mark">The goal is to never go over the budget</mark>
                  </p>
                </div>
              </div>
            </div>
    
            <div className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h1 className="card-title">Results</h1>
                  <p className="card-text">
                    People who stick to a <mark className="mark">financial plan, budgeting every expense</mark>, get out of debt faster!
                    Also, they live happier lives... since they expend without guilt or fear...
                    because they know it is all good and accounted for.
                  </p>
                </div>
              </div>
            </div>
          </div>
    
            <div className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h1 className="card-title">Free</h1>
                  <p className="card-text">
                    This app is free!!! And you are the only one holding your data!
                  </p>
                </div>
              </div>
    
            <div className="col-md-6">
              <div className="card" style={{ width: '550px' }}>
                <div className="card-body" style={{ height: '600px' }}>
                  <h1 className="card-title">Chartjs</h1>
                  <p className="card-text">
                    <canvas id="Chart" width="50" height="50"></canvas>
                  </p>
                </div>
              </div>
            </div>
          </div>
    
          <div className="row mt-3">
            <div ref={d3Container} className="col-md-12">
              <div className="card" style={{ width: '600px' }}>
                <div className="card-body" style={{ height: '400px' }}>
                  <h1 className="card-title">D3js Chart</h1>
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    
    export default HomePage;

