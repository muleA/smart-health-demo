import React from 'react';
import {CalendarOutlined, HeatMapOutlined} from '@ant-design/icons';
import Progress, { ProgressTypes } from 'antd/es/progress/progress';
import { Divider } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
export default function ProgressChartCard() {

  const ProgressBar = [
    {
      key:"1." ,
      text: 'Pharmaceutical License',
      status: "active",
      percent: 100,
    },
    {
      key:"2.",
      text: 'Restaurant Licenses',
      status: "",
      percent: 32,
    },
    {
      key:"3.",
      text: 'Business Licenses',
      status: "",
      percent: 59,
    },
  ];

  const data = {
    labels: ['Rejected', 'Accepted', 'Pending'],
    datasets: [
      {
        label: '# of Licenses',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,    
          
      },
      
    ],
  };
  return (
    <div>
      <div className="bg-white p-4 rounded-2xl shadow-lg">
      <div className=" font-bold gap-2 text-blue-400 text-2xl">Licenses Progress</div>
        <Divider className='m-2'/>
      { ProgressBar.map((progress, p) =>(
        <div>
        <div className="gap-3">
          
        <div className="flex flex-row ">
           <div className= "font-bold text-xl  ">
             {progress.key}
           </div>
             <div className='m-1'>
               {progress.text}
             </div>
             </div>
             <span className='ml-4'>
              <Progress percent={progress.percent}  className='w-4/5 '/>
             </span>
         </div>
         </div>
      ))}
      </div>
      <div className="bg-white p-4 my-4 rounded-2xl shadow-lg">
        <div>
        <div className=" font-bold gap-2 text-blue-400 text-2xl">Status Progress</div>
        <Divider className='m-2'/>
         <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
}
