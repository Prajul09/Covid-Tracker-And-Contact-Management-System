import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DynamicLineChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const Charts = () => {
  const [casesData, setCasesData] = useState(null);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then((response) => {
        setCasesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  let chartData = null;
  if (casesData) {
    const labels = Object.keys(casesData.cases);
    const cases = Object.values(casesData.cases);
    const recovered = Object.values(casesData.recovered);
    const deaths = Object.values(casesData.deaths);

    chartData = {
      labels,
      datasets: [
        {
          label: 'Cases',
          data: cases,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: true,
        },
        {
          label: 'Recovered',
          data: recovered,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          fill: true,
        },
        {
          label: 'Deaths',
          data: deaths,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          fill: true,
        },
      ],
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'COVID-19 Cases Fluctuation',
        font: {
          size: 18,
        },
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxHeight: '600px', overflow: 'auto' }}>
      <h2 className="text-2xl font-bold mb-4 text-center pb-6">Charts & Graphs Screen</h2>
      {chartData && <DynamicLineChart options={options} data={chartData} />} 
    </div>
  );
};

export default Charts;



