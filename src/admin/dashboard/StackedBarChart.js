import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


// ... [Include processData and generateRandomColor functions here]


const processData = (jsonData) => {
    const statusCounts = {};
    jsonData.forEach(item => {
      if (item.user_current_status && item.job_posting_title) {
        if (!statusCounts[item.user_current_status]) {
          statusCounts[item.user_current_status] = {};
        }
        if (!statusCounts[item.user_current_status][item.job_posting_title]) {
          statusCounts[item.user_current_status][item.job_posting_title] = 0;
        }
        statusCounts[item.user_current_status][item.job_posting_title]++;
      }
    });
  
    const labels = Object.keys(statusCounts);
    const datasets = {};
  
    labels.forEach(status => {
      Object.keys(statusCounts[status]).forEach(title => {
        if (!datasets[title]) {
          datasets[title] = [];
        }
        datasets[title].push(statusCounts[status][title]);
      });
    });
  
    return {
      labels,
      datasets: Object.keys(datasets).map(title => ({
        label: title,
        data: datasets[title],
        backgroundColor: generateRandomColor(),
      }))
    };
  };
  
  const generateRandomColor = () => {
    // Generate a random color for each dataset
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
  };




const StackedBarChart = ({ data }) => {
  const chartData = processData(data);

  const options = {
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  };

  return <Bar data={chartData} options={options} />;
};

const MyComponent = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.heineken.londonladder.com:8000/candidate-applications/job-posting/DSO-960112/?format=json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return <StackedBarChart data={jsonData} />;
};

export default MyComponent;
