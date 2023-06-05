import React from "react";
import { Button, Divider, Select, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetLicensesQuery } from "../home-query";
import timeSince from "../../../shared/utilities/time-since";

function TableCard() {
  const navigate = useNavigate();
  const { data: licenses, isLoading } = useGetLicensesQuery();

  const columns = [
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (text: any) => <a className="text-blue-500">{text}</a>,
    },
    {
      title: "Entry In",
      dataIndex: "validFrom",
      key: "validFrom",
      render: (validFrom: any) => timeSince(validFrom),
    },

    {
      title: "Expire Out",
      dataIndex: "validTo",
      key: "validTo",
      render: (validTo: any) => timeSince(validTo, false, true),
    },
    {
      title: "status ",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <Tag
          color={
            status === "SUBMITED"
              ? "geekblue"
              : status === "SUSPENDED"
              ? "red"
              : "green"
          }
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: () => {
        return (
          <>
            <Space size="middle">
              <a className="text-blue-500">See More</a>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <div className="">
      <div className="bg-white p-4 rounded-2xl shadow-lg pb-8">
        <div className="flex justify-between">
          <div className=" font-bold gap-2 text-blue-400 text-2xl ">
            Licenses{" "}
          </div>
          <Button className="bg-blue-500 ">
            <div className="text-white" onClick={()=>navigate("/new-application")}> Add new </div>
          </Button>
        </div>

        <Divider className="m-2" />
        <Table dataSource={licenses} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}

export default TableCard;
