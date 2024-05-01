import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
// import 'chart.js';


function Visuals() {
  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        budget: [],
        expense: [],
        backgroundColor: [],
      },
    ],
    labels1: [],
    labels2: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataExists, setDataExists] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [months, setMonths] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);

  function getRandomColor(previousColors) {
    const h = Math.floor(Math.random() * 360); // Random hue
    const s = Math.floor(Math.random() * 20) + 60; // Saturation between 60 and 80
    const l = Math.floor(Math.random() * 20) + 70; // Lightness between 70 and 90
  
    const color = `hsl(${h}, ${s}%, ${l}%)`;
  
    // Ensure the generated color is not in the previousColors array
    return previousColors.includes(color) ? getRandomColor(previousColors) : color;
  }
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (selectedMonth) {
      axios
        .get(`http://localhost:3002/get-budgets/${userId}?month=${selectedMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (res) {
          if (res.data && res.data.length > 0) {
            const updateData = { ...dataSource };
            for (var i = 0; i < res.data.length; i++) {
              updateData.datasets[0].budget[i] = res.data[i].budget;
              updateData.datasets[0].backgroundColor[i] = getRandomColor(dataSource.datasets[0].backgroundColor);
              updateData.labels1[i] = res.data[i].category;
            }
            setDataSource(updateData);
            setDataExists(true);
            setDataLoaded(true);
          } else {
            setDataExists(false);
            setDataLoaded(true);
          }
        });
    }
  }, [selectedMonth]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (selectedMonth) {
      axios
        .get(`http://localhost:3002/get-expenses/${userId}?month=${selectedMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (res) {
          if (res.data && res.data.length > 0) {
            const updateExpenses = { ...dataSource };
            for (var i = 0; i < res.data.length; i++) {
              updateExpenses.datasets[0].expense[i] = res.data[i].expense;
              updateExpenses.datasets[0].backgroundColor[i] = getRandomColor(dataSource.datasets[0].backgroundColor);
              updateExpenses.labels2[i] = res.data[i].category;
            }
            setDataSource(updateExpenses);
            setDataExists(true);
            setDataLoaded(true);
          } else {
            setDataExists(false);
            setDataLoaded(true);
          }
        });
    }
  }, [selectedMonth]);

  const createPolarareaChart = (chartRef, data, labels) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'polarArea',
        data: {
          datasets: [
            {
              data: data,
              backgroundColor: dataSource.datasets[0].backgroundColor,
            },
          ],
          labels: labels,
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createLineChart = (chartRef, labels, budgetData, expenseData) => {
    console.log("Creating Line Chart");
    console.log("Labels:", labels);
    console.log("Budget Data:", budgetData);
    console.log("Expense Data:", expenseData);
  
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budgetData,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Expense',
              data: expenseData,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
      });
  
      return () => {
        chart.destroy();
      };
    }
};

const createScatterPlot = (chartRef, labels, data) => {
  console.log("Creating Scatterplot Chart");
  console.log("Labels:", labels);
  console.log("Data:", data);

  if (chartRef.current) {
    try {
      const chart = new Chart(chartRef.current, {
        type: 'scatter',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Scatter Plot',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    } catch (error) {
      console.error("Error creating scatterplot chart:", error);
    }
  }
};

// Usage

// Usage

const createBubbleChart = (chartRef, labels, budgetData, expenseData) => {
  console.log("Creating Bubble Chart");
  console.log("Labels:", labels);
  console.log("Budget Data:", budgetData);
  console.log("Expense Data:", expenseData);

  if (chartRef.current) {
    const chart = new Chart(chartRef.current, {
      type: 'bubble',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Budget',
            data: budgetData.map((value) => ({ x: value, y: 0, r: 10 })), // y: 0 to separate bubbles
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: 'Expense',
            data: expenseData.map((value) => ({ x: value, y: 1, r: 10 })), // y: 1 to separate bubbles
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }
};



// Usage



  const createGroupedBarChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expense',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createRadarChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createDoughnutChart = (chartRef, data, labels) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: data,
              backgroundColor: dataSource.datasets[0].backgroundColor,
            },
          ],
          labels: labels,
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createComboChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              type: 'bar',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              type: 'line',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const chartRef = useRef(null);
  const expenseRef = useRef(null);
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  const chart5Ref = useRef(null);
  const lineChartRef = useRef(null);
  const bubbleChartRef=useRef(null);

  useEffect(() => createPolarareaChart(chartRef, dataSource.datasets[0].budget, dataSource.labels1), [dataSource]);
  useEffect(() => createPolarareaChart(expenseRef, dataSource.datasets[0].expense, dataSource.labels2), [dataSource]);
  useEffect(() => createGroupedBarChart(chart1Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  useEffect(() => createRadarChart(chart2Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  useEffect(() => createDoughnutChart(chart3Ref, dataSource.datasets[0].budget, dataSource.labels1), [dataSource]);
  useEffect(() => createDoughnutChart(chart4Ref, dataSource.datasets[0].expense, dataSource.labels1), [dataSource]);
  useEffect(() => createComboChart(chart5Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  useEffect(() => createLineChart(lineChartRef, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  useEffect(() => createBubbleChart(bubbleChartRef, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);


  return (
    <main className="container mt-5 container-main justify-content-center align-items-center">
      <div className="mb-3">
        <label htmlFor="months" className="form-label">Select Month:</label>
        <select id="months" className="form-select" onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {dataLoaded ? (
        dataExists ? (
          <section>


            <section className="row row-cols-1 row-cols-md-2 g-4 mt-3">
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Histogram</h1>
                  <div className="card-body">
                    <canvas ref={chart1Ref} />
                  </div>
                </div>
              </article>
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Radar Chart</h1>
                  <div className="card-body">
                    <canvas ref={chart2Ref} />
                  </div>
                </div>
              </article>
            </section>

            {/* <section className="row row-cols-1 row-cols-md-2 g-4 mt-3">
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Doughnut Chart - Budget</h1>
                  <div className="card-body">
                    <canvas ref={chart3Ref} />
                  </div>
                </div>
              </article> */}
              {/* <article className="col">
                <div className="card">
                  <h1 className="card-header">Doughnut Chart - Expenses</h1>
                  <div className="card-body">
                    <canvas ref={chart4Ref} />
                  </div>
                </div>
              </article> */}
            {/* </section> */}

            {/* <section className="row row-cols-1 mt-3">
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Combo Chart</h1>
                  <div className="card-body">
                    <canvas ref={chart5Ref} />
                  </div>
                </div>
              </article>
            </section> */}
            <section className="row row-cols-1 mt-3">
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Line Chart</h1>
                  <div className="card-body">
                    <canvas ref={lineChartRef} />
                  </div>
                </div>
              </article>
            </section>
            <section className="row row-cols-1 row-cols-md-2 g-4">
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Polar Area Chart - Budget</h1>
                  <div className="card-body">
                    <canvas ref={chartRef} />
                  </div>
                </div>
              </article>
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Polar Area Chart - Expenses</h1>
                  <div className="card-body">
                    <canvas ref={expenseRef} />
                  </div>
                </div>
              </article>
            </section>
            <section className="row row-cols-1 mt-3">
              <article className="col">
                <div className="card">
                  <h1 className="card-header">Bubble Chart</h1>
                  <div className="card-body">
                    <canvas ref={bubbleChartRef} />
                  </div>
                </div>
              </article>
            </section>

          </section>
          
        ) : (
          <div>
            <p>Data is not present. Please enter the data.</p>
          </div>
        )
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}

export default Visuals;
