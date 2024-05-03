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
        <div className="info-box">
            <h2>Welcome to our personal budget website !</h2>
            <p>Our platform is designed to help you manage your finances effectively and reach your financial goals with ease.</p>
            <p>Whether you're looking to track your expenses, set budgets, or visualize your spending patterns, we've got you covered. With our intuitive interface, you can easily input your income and expenses, categorize transactions, and monitor your overall financial health in real-time.</p>
            <p>Our budgeting tools provide insights into where your money is going, allowing you to make informed decisions about your spending habits.</p>
            <svg ref={svgRef} width={500} height={300}></svg>
        </div>
    );
}

function HomePage() {
    const [budgetData, setBudgetData] = useState([]);
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
        <div>
            <BarChart />
        </div>
    );
}

export default HomePage;
