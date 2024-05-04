import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './css/trackElement.css';
const SingleChart = ({curve}) => {
  const chartContainer = useRef(null); // Reference to the canvas container
  const chartInstance = useRef(null); // Reference to the Chart instance

  useEffect(() => {

    // Destroy previous Chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new Chart instance
    if (chartContainer.current) {

      const chartSpec =         {
          type: 'line',
          maintainAspectRatio: false,
          data: {
            //labels: curve.dataSet.map(row => row[curve.yField]),
            datasets: [
             curve.datasetSpec
            ]
          },
          options:{
            aspectRatio:0.5,
            scales:{
              "x-axis-main": {
                type: 'linear',
                position: 'top'
              },
              y: {
                type: 'linear',
                position: 'left',
                grid: {
                  drawOnChartArea: true,
                }
              }
            }
          }
        }

      console.log(JSON.stringify(chartSpec, null, 2) );
      chartInstance.current = new Chart(
        chartContainer.current.getContext('2d'), // Get the canvas context
        chartSpec
      );
    }
    // Cleanup function
    return () => {
      // Ensure Chart instance is destroyed when component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [curve.dataset, curve.field, curve]); 
  return (
    <div class = "trackContainer">
      <canvas class = "track" id="track_1" ref={chartContainer}></canvas>
    </div>
  );
  }

export default SingleChart;
