import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import './chart.css';
const COLORS = [
  '#0088FE',      // Total Applications
  '#00C49F',      // Approved Applications
  '#FF8042',      // Rejected Applications
  '#FFBB28',      // Submitted Applications
];

const SimplePieChart = (props: { submitted: any; approved: any; rejected: any; total: any; }) => {
  const { submitted, approved, rejected, total } = props;

  const data = [
    { name: 'submitted ', value: submitted },
    { name: 'approved', value: approved },
    { name: 'rejected', value: rejected },
    { name: 'total ', value: total ??0},
  ];
  const data2 = {
    labels: ['Rejected', 'Submitted', 'Approved', 'total'],
    datasets: [
      {
        data: [rejected, submitted,approved, total], // Add corresponding data values for all enum values
        backgroundColor: [
          'rgba(255, 99, 132, 1)', // Rejected - Red
          'rgba(255, 206, 86, 1)', // Submitted - Yellow
          'rgba(75, 192, 192, 1)', // Approved - Green
          'rgba(153, 102, 255, 1)', // Suspended - Purple
        ],
        borderWidth: 1,
    
      },
      
    ],
  };

  return (
    <div className="w-full">
    <div className="bg-white p-5 rounded-2xl shadow-lg mr-4">
    <h2 className="text-xl mb-4">Applications Pie Chart</h2>
         <Pie className='w-1/2' data={data2} />
    </div>
    </div>
  );
};

export default SimplePieChart;
