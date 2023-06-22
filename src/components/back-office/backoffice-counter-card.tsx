import React from 'react';
import { AppstoreOutlined, BookOutlined, BookTwoTone,  CheckCircleTwoTone,  CiOutlined,  CloseCircleTwoTone, InfoCircleTwoTone, TeamOutlined, UserOutlined} from '@ant-design/icons';
import  { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from 'antd';
export interface BackOfficeCounterCardHeaderProps {
  header: any;
}


 
function BackOfficeCounterCard({totalRegisterUser,totalRegisterEmployee,totalApplication,totalLicense,totalNumberArchives}:any) {

     const Headers = [
      {
        text: 'Total Registered Users',
        bg: 'pt-8 pl-5 pr-5 rounded-l-2xl bg-teal-400 ',
        color: '#2dd4bf',
        icon: <UserOutlined style={{fontSize: '25px', color:'#fff'}} />,
        count: 20,
      },
      {
        text: 'Total Registered Employees',
        bg: 'pt-8 pl-5 pr-5 rounded-l-2xl  bg-sky-400',
        color: '#38bdf8',
        icon: <TeamOutlined style={{fontSize: '25px', color:'#fff'}}/>,
        count: 10,
      },
      {
        text: 'Total Applications',
        bg: 'pt-8 pl-5 pr-5 rounded-l-2xl bg-lime-400 ',
        color: '#a3e635',
        icon: <AppstoreOutlined style={{fontSize: '25px', color:'#fff'}}/>,
        count: 25,
      },
      {
        text: 'Total Licenses',
        bg: 'pt-8 pl-5 pr-5 rounded-l-2xl bg-indigo-400',
        color: '#818cf8',
        icon: <BookOutlined style={{fontSize: '25px', color:'#fff'}}/>,
        count: 44,
      },
      {
        text: 'Total Number of Archives',
        bg: 'pt-8 pl-5 pr-5 rounded-l-2xl bg-orange-300 ',
        color: '#fdba74',
        icon: <CiOutlined style={{fontSize: '25px', color:'#fff'}}/>,
        count: 40,
      },
    ];
  return (
  
    <>
    {totalRegisterUser || totalRegisterEmployee || totalApplication || totalLicense || totalNumberArchives ? (
  <Spin />
) : (
  <div className="flex flex-wrap">
    {Headers.map((header:any,index:number) => (
      <div className="w-full mb-4 sm:w-1/4" key={index}>
        <div className="bg-white rounded-2xl shadow-lg mr-4">
          <div className="flex gap-3">
            <div className={header.bg}>{header.icon}</div>
            <div className="flex flex-col p-5 justify-between">
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

export default BackOfficeCounterCard;
