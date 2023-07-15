import React, { useEffect, useState } from 'react';
import { Badge, Table } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../configs/config';
import { useAuth } from '../../shared/auth/use-auth';
import { useGetApplicationUserIdQuery } from '../portal.query';
import StatusIndicator from '../../shared/status-indicator';

interface User {
  id: string;
  Column1: string;
  LastName: string;
  phone: string;
  Email: string;
}

export const ApplicationList = (): JSX.Element => {
  const { session } = useAuth();
  const router = useNavigate();
  const {data:applications,isLoading}=useGetApplicationUserIdQuery(session?.userInfo?.userId)
 
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
      title: "Application Category",
      dataIndex: "applicationCategory",
      key: "applicationCategory",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status: any) => (
        <span
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <StatusIndicator
          text={status}
          color={
            status === "SUBMITED"
              ? "warning.main"
              : status === "REJECTED"
              ? "error.main"
              : "success.main"
          }
        />
        {!status && <>-</>}
      </span>

      
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
      dataSource={applications ?? []}
      columns={columns}
      loading={isLoading}
      onRow={rowProps}
      rowKey="id"
      scroll={{ x: '100vw' }}
    />
  );
};

export default ApplicationList;
