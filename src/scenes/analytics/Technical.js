import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js/auto';

const options = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Technical Marks',
      font: {
        size: 18,
        weight: 'bold',
        
      },
      
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        beginAtZero: true,
        stepSize: 5,
      },
    },
  },
};

const Total = () => {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3001/getSingleData';
        const response = await axios.get(url);
        const data = response.data;
        console.log("testshare", data);
        setData1(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getChartData = () => {
    if (!data1 || data1.length === 0) {
      return {}; // Return empty object if data1 is undefined or empty
    }
 
    const labels = data1.map((item) => {
      const dateObject = new Date(item.Date);
      const formattedDate = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      return formattedDate;});
    const marks = data1.map((item) => item.Tech);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Marks obtained',
          data: marks,
          backgroundColor: 'rgba(238, 125, 49, 0.8)', // Orange with transparency
          borderColor: 'rgba(238, 125, 49, 1)', // Orange
          borderWidth: 2,
          borderRadius: 10,
          hoverBackgroundColor: 'rgba(238, 125, 49, 1)', // Orange (hover)
        },
      ],
    };
  };

  return (
    <div className='graph' style={{ width: '100%', maxWidth: '500px', height: '400px', margin: '60px auto' }}>
      {data1.length > 0 ? (
        <Line data={getChartData()} options={options} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Total;
