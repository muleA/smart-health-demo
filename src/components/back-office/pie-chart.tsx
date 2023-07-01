import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg mr-4">
    <h2 className="text-xl mb-4">Applications Pie Chart</h2>
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
