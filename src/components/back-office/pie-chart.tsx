import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SimplePieChart = (props: { totalRestaurant: any; totalDriver: any; totalUser: any; totalOrder: any; }) => {
  const { totalRestaurant, totalDriver, totalUser, totalOrder } = props;

  const data = [
    { name: 'Pending ', value: totalRestaurant },
    { name: 'Users', value: totalUser },
    { name: 'Employees', value: totalDriver },
    { name: 'Approved ', value: totalOrder },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg mr-4">
    <h2 className="text-xl mb-4">Pie Chart that shows users,employees and Application distributions</h2>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={true}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </div>
  );
};

export default SimplePieChart;
