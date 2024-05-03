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
                label: 'Temperature en fonction de la profondeur',
                data: data.map(row => ({ y: row.MD, x: row[field] })),
                xAxisID: 'x-axis-1'

              },
              {
                label: 'C1',
                data: data.map(row => ({ y: row.MD, x: row["C1"] })),
                xAxisID: 'x-axis-2'
              }
            ]
          },
          options:{
            scales:{
              'x-axis-1': {
                type: 'linear',
                position: 'top'
              },
              y: {
                type: 'linear',
                position: 'left',
                grid: {
                  drawOnChartArea: false,
                }
              },
              'x-axis-2': {
                type: 'linear',
                position: 'top',
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
