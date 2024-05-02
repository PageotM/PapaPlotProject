import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const SingleChart = () => {
  const chartContainer = useRef(null); // Reference to the canvas container
  const chartInstance = useRef(null); // Reference to the Chart instance

  useEffect(() => {
    const data = [
      { profondeur: -10, Temp: 10 },
      { profondeur: -12, Temp: 12 },
      { profondeur: -25, Temp: 15 },
      { profondeur: -35, Temp: 14 },
      { profondeur: -47, Temp: 21 },
      { profondeur: -53, Temp: 27 },
    ];

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
          data: {
            labels: data.map(row => row.profondeur),
            datasets: [
              {
                label: 'Temperature en fonction de la profondeur',
                data: data
                .map(row => ({
                  y: row.profondeur,
                  x: row.Temp,
                }))
  
              }
            ]
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
  }, []); // Empty dependency array to run only once after mounting

  return (
    <div style={{ width: '800px' }}>
      <canvas id="acquisitions" ref={chartContainer}></canvas>
    </div>
  );
}

export default SingleChart;
