import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './css/trackElement.css';

const SingleChart = ({track}) => {
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
        track.trackSpec
      );
    }
    // Cleanup function
    return () => {
      // Ensure Chart instance is destroyed when component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [track.trackSpec]); 
  return (
    <div className = "singleTrackContainer">
      <canvas className = "track" id="track_1" ref={chartContainer}></canvas>
    </div>
  );
  }

export default SingleChart;
