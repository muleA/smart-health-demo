import React, { useEffect, useState } from "react";
import { Badge, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../shared/config";
import { useAuth } from "../shared/auth/use-auth";

interface User {
  id: string;
  Column1: string;
  LastName: string;
  phone: string;
  Email: string;
}

export const ApplicationList = (): JSX.Element => {
  const [data, setData] = useState(null);
  const { session } = useAuth();
  const router = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}user/get-application-by-userId/${session?.userInfo?.userId}`
        );
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleRowClick = (record: User) => {
    const { id } = record;
    router(`/my-applications/${id}`);
  };

  const handleMouseEnter = (record: User) => {
    const { id } = record;
    setSelectedRow(id);
  };

  const handleMouseLeave = () => {
    setSelectedRow(null);
  };

  const columns = [
    {
      title: "Application Type",
      dataIndex: "applicationType",
      key: "applicationType",
    },
    {
      title: "Applier Type",
      dataIndex: "applierType",
      key: "applierType",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Licence",
      dataIndex: "license",
      key: "license",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status: any) => (
        <Badge
          color={
            status === "SUBMITED"
              ? "blue"
              : status === "Rejected"
              ? "red"
              : "green"
          }
          text={status}
        />
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "arrow",
      render: (_: any, record: User) => (
        <RightOutlined
          className={`arrow-icon ${
            selectedRow === record.id ? "visible" : "invisible"
          }`}
        />
      ),
    },
  ];

  const rowProps = (record: User): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => handleRowClick(record),
      onMouseEnter: () => handleMouseEnter(record),
      onMouseLeave: handleMouseLeave,
      className: `cursor-pointer ${
        selectedRow === record.id ? "bg-gray-100" : ""
      }`,
    };
  };

  return (
    <Table<User>
      dataSource={data ?? []}
      columns={columns}
      onRow={rowProps}
      rowKey="id"
    />
  );
};

export default ApplicationList;
