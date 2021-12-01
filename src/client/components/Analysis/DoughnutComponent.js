import React from 'react';
import { Doughnut } from 'react-chartjs-2';


function DoughnutComponent(props) {
  const {
    chartColor, chartData, chartWidth, chartHeight,
  } = props;

  const data = {
    labels: ['여성', '남성'],
    datasets: [
      {
        label: '# of Votes',
        data: [19, 5],
        backgroundColor: [
          'rgba(0, 212, 181)',
          'rgba(0, 0, 0, 0.2)',
        ]
      },
    ],
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: true,
    cutoutPercentage: 65, // толщина полоски
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: 'The title',
            font: {
              size: '20'
            },
            color: 'red'
          },
        ]
      }
    }
  };

  const sizes = {
    width: 120,
    height: 120
  };

  if (chartColor) data.datasets[0].backgroundColor = chartColor;
  if (chartData) data.datasets[0].data = chartData;
  if (chartHeight) sizes.height = chartHeight;
  if (chartWidth) sizes.width = chartWidth;

  return (
    <Doughnut width={sizes.width} height={sizes.height} data={data} options={options} />
  );
}

export default DoughnutComponent;
