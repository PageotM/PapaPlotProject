import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const SingleChart = ({data, field}) => {
  const chartContainer = useRef(null); // Reference to the canvas container
  const chartInstance = useRef(null); // Reference to the Chart instance

  useEffect(() => {

    // Destroy previous Chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new Chart instance
    if (chartContainer.current) {
      chartInstance.current = new Chart(
        chartContainer.current.getContext('2d'), // Get the canvas context
        {
          type: 'line',
          maintainAspectRatio: false,
          data: {
            labels: data.map(row => row.MD),
            datasets: [
              {
                label: 'Temperature',
                data: data.map(row => ({ y: row.MD, x: row[field] })),
                xAxisID: 'x-axis-main'

              },
              {
                label: 'C1',
                data: data.map(row => ({ y: row.MD, x: row["C1"] })),
                xAxisID: 'x-axis-C1'
              }
            ]
          },
          options:{
            scales:{
              'x-axis-main': {
                type: 'linear',
                position: 'top'
              },
              'x-axis-C1': {
                type: 'linear',
                position: 'top',
                grid: {
                  drawOnChartArea: false,
                }
              },
              y: {
                type: 'linear',
                position: 'left',
                grid: {
                  drawOnChartArea: false,
                }
              }
            }
          }
        }
      );
    }
    // Cleanup function
    return () => {
      // Ensure Chart instance is destroyed when component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data,field]); // Empty dependency array to run only once after mounting

  return (
    <div >
      <canvas id="acquisitions" ref={chartContainer}></canvas>
    </div>
  );
  }

export default SingleChart;
