import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data }: any) => {
  const processDataForBarChart = (inputData: Array<any>) => {
    let processedData: { [key: string]: number } = {};
  
    inputData?.forEach((item: { status: string | number; value: number }) => {
      if (processedData[item.status]) {
        processedData[item.status] += item.value;
      } else {
        processedData[item.status] = item.value;
      }
    });
  
    return Object.entries(processedData)?.map(([statusName, count]) => ({
      name: statusName,
      value: count,
    }));
  };
  

  const chartData = processDataForBarChart(data);

  return (
    <div className="w-full">
      <div className="bg-white p-5 rounded-2xl shadow-lg mr-4 mb-2">
        <h2 className="text-xl mb-4"> Bar Chart (Applications, Employees, Users, Licenses) </h2>
        <BarChart width={550} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip labelStyle={{ color: '#8884d8' }} />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
