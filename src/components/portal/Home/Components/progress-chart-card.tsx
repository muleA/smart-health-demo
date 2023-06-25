import React from 'react';
import {CalendarOutlined, HeatMapOutlined} from '@ant-design/icons';
import Progress, { ProgressTypes } from 'antd/es/progress/progress';
import { Divider } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
export default function ProgressChartCard({approvedLicense,draftLicese,submittedLicese,REJECTEDLicese,SUSPENDEDLicese,ISSUEANCELicese,approvedLicenseLoading,
  draftLicenseLoading,submittedLicenseLoading,REJECTEDLicenseLoading,SUSPENDEDLicenseLoading,ISSUEANCELicenseLoading}:any) {

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
    labels: ['Rejected', 'Submitted', 'Approved', 'Suspended'],
    datasets: [
      {
        label: '# of Licenses',
        data: [REJECTEDLicese?.length, submittedLicese?.length,approvedLicense?.length, SUSPENDEDLicese?.length], // Add corresponding data values for all enum values
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Rejected - Red
          'rgba(255, 206, 86, 0.2)', // Submitted - Yellow
          'rgba(75, 192, 192, 0.2)', // Approved - Green
          'rgba(153, 102, 255, 0.2)', // Suspended - Purple
        ],
        borderColor: [
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
    <div>
 
     <div className="bg-white p-4  rounded-2xl shadow-lg">
        <div>
        <div className=" font-bold gap-2 text-blue-400 text-2xl">Status Progress</div>
        <Divider className='m-2'/>
         <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
}
