import React, { useEffect } from "react";
import { Button, Divider, Select, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetLicensesQuery, useLazyGetLicenseByApplicationIdQuery } from "../home-query";
import { useLazyGetUserByIdQuery } from "../../../back-office.query";

function TableCard() {
  const navigate = useNavigate();
  const { data: licenses, isLoading } = useGetLicensesQuery();
const[trigger,{data:appInfo,isLoading:appInfoLoading}]=useLazyGetLicenseByApplicationIdQuery()
const[triggerUserInfo,{data:userInfo,isLoading:userInfoLoading}]=useLazyGetUserByIdQuery()

console.log("appInfo",appInfo)
useEffect(()=>{
  if(licenses){
    trigger(licenses[0]?.applicationId)
  }
},[licenses, trigger])
useEffect(()=>{
  if(licenses){
    triggerUserInfo(licenses[0]?.userId)
  }
},[licenses, triggerUserInfo])
const columns = [
  {
    title: "LicenseType",
    dataIndex: "applicationType",
    key: "ApplicationType",
    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <a className="text-blue-500">{text}</a>,
  },
  {
    title: "License Category",
    dataIndex: "applicationCategory",
    key: "ApplicationCategory",
    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <a className="text-blue-500">{text}</a>,
  },

  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <a className="text-blue-500">{text}</a>,
  },
  {
    title: "Entry In",
    dataIndex:['license', "validFrom"],
    key: "validFrom",
  },
  {
    title: "Expire Out",
    dataIndex:[ 'license', "validTo"],
    key: "validTo",

  },
  {
    title: "Status",
    dataIndex: ["license", "status"],
    key: "status",
    render: (status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => (
      <Tag
        color={
          status === "ACTIVE" ? "green" : status === "SUSPENDED" ? "red" : "yellow"
        }
      >
        {status}
      </Tag>
    ),
  },
 
];


  return (
    <div className="">
      <div className="bg-white p-4 rounded-2xl shadow-lg pb-8">
        <div className="flex justify-between">
          <div className=" font-bold gap-2 text-blue-400 text-2xl ">
            Licenses{" "}
          </div>
        
        </div>

        <Divider className="m-2" />
        <Table dataSource={[appInfo]} columns={columns} loading={isLoading||appInfoLoading} scroll={{ x: '100vw' }} />
      </div>
    </div>
  );
}

export default TableCard;
