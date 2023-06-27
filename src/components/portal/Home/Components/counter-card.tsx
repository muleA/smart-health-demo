import React from 'react';
import { BookTwoTone,  CheckCircleTwoTone,  CloseCircleTwoTone, InfoCircleTwoTone} from '@ant-design/icons';
import { useGetLicensesQuery } from '../home-query';
import { Spin } from 'antd';
export interface CounterCardHeaderProps {
  header: any;
}


 
function CounterCard({approvedLicense,draftLicese,submittedLicese,REJECTEDLicese,SUSPENDEDLicese,ISSUEANCELicese,approvedLicenseLoading,
  draftLicenseLoading,submittedLicenseLoading,REJECTEDLicenseLoading,SUSPENDEDLicenseLoading,ISSUEANCELicenseLoading}:any) {
 const{data:licenses,isLoading}=useGetLicensesQuery()

     const Headers = [
      {
        text: 'Total License',
        bg: 'bg-blue-100',
        color: '#0066FF',
        icon: <BookTwoTone  twoToneColor="#0066FF"style={{fontSize: '25px',}} />,
        count: licenses?.length
      },
    
      {
        text: 'Submitted Licenses',
        bg: 'bg-yellow-100',
        color: '#F8B219',
        icon: <InfoCircleTwoTone twoToneColor="#F8B219"  style={{fontSize: '25px',}}/>,
        count: submittedLicese?.length,
      },
      {
        text: 'Approved Licenses',
        bg: 'bg-green-100',
        color: '#52c41a',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '25px',}} />,
        count: approvedLicense?.length,
      },
  
      {
        text: 'Suspended Licenses',
        bg: 'bg-red-100',
        color: '#FF0000',
        icon: <CloseCircleTwoTone twoToneColor="#FF0000" style={{fontSize: '25px',}}/>,
        count: SUSPENDEDLicese?.length??0,
      },
    ];
  return (
  
    <>
    {approvedLicenseLoading || REJECTEDLicenseLoading || submittedLicenseLoading || draftLicenseLoading || SUSPENDEDLicenseLoading || ISSUEANCELicenseLoading ? (
    <div className="flex justify-center items-center" style={{ minHeight: "200px" }}>
    <Spin />
  </div>
) : (
  <div className="flex flex-wrap">
    {Headers.map((header:any,index:number) => (
      <div className="w-full mb-4 sm:w-1/4" key={index}>
        <div className="bg-white p-5 rounded-2xl shadow-lg mr-4">
          <div className="flex gap-3">
            <div className="p-5">{header.icon}</div>
            <div className="flex flex-col justify-between">
              <div className="font-bold text-xl">{header.text}</div>
              <span className="text-blue-500 text-lg font-bold" style={{ color: header.color }}>
                {header.count}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

    
    </>

  );
}

export default CounterCard;
