import React from 'react';
import { BookTwoTone,  CheckCircleTwoTone,  CloseCircleTwoTone, InfoCircleTwoTone} from '@ant-design/icons';
import  { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../shared/config";
export interface CounterCardHeaderProps {
  header: any;
}


  const Headers = [
    {
      text: 'Total License',
      bg: 'bg-blue-100',
      color: '#0066FF',
      icon: <BookTwoTone  twoToneColor="#0066FF"style={{fontSize: '25px',}} />,
      count: 125
    },
    {
      text: 'Pending Licenses',
      bg: 'bg-yellow-100',
      color: '#F8B219',
      icon: <InfoCircleTwoTone twoToneColor="#F8B219"  style={{fontSize: '25px',}}/>,
      count: 53,
    },
    {
      text: 'Approved Licenses',
      bg: 'bg-green-100',
      color: '#52c41a',
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '25px',}} />,
      count: 32,
    },
    {
      text: 'Rejected Licenses',
      bg: 'bg-red-100',
      color: '#FF0000',
      icon: <CloseCircleTwoTone twoToneColor="#FF0000" style={{fontSize: '25px',}}/>,
      count: 12,
    },
  ];
function CounterCard() {
  // const [licenses , setLicenses] = useState([]);

  // useEffect(() => {
  //   fetchLicenses();
  // }, []);

  // const fetchLicenses = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}user/get-user/`
  //     );
  //     setLicenses(response.data);
  //   } catch (error) {
  //     console.error("Error fetching licenses:", error);
  //   }
  // };
  
  return (
    <div className="flex flex-wrap ">
    {Headers.map((header) => (
    <div className=" w-full sm:w-1/4">

       <div className="bg-white p-5 rounded-2xl shadow-lg mr-4">
        <div className="flex gap-3">
          <div className= " p-5 ">
            {header.icon}
          </div>

          <div className="flex flex-col justify-between">
            <div className="font-bold text-xl " >
              {header.text}
            </div>
            <span
              className=" text-blue-500 text-lg font-bold"
              style={{ color: header.color }}
            >
              {header.count.toString()}
            </span>
          </div>
        </div>
      </div>
    </div>
                ))}

    </div>
  );
}

export default CounterCard;
