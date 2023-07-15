import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = (props: { submitted: any; approved: any; rejected: any; total: any; }) => {
  const { submitted, approved, rejected, total } = props;  
  const data2 = {
    labels: ['Total','Rejected', 'Submitted', 'Approved' ],
    datasets: [
      {
        label:'# of Employee',
        data: [total,rejected, submitted,approved], // Add corresponding data values for all enum values
        backgroundColor:'#3B82F6', 
        
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="bg-white p-5 rounded-2xl shadow-lg mr-4 mb-2">
        <h2 className="text-xl mb-4"> Bar Chart (Applications, Employees, Users, Licenses) </h2>
        <Bar data={data2}/>
      </div>
    </div>
  );
};

export default Chart;
