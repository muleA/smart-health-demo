import React, { useState } from 'react';
import { Table } from 'antd';
import { useGetUsersQuery } from './user-query';
import { Link, useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import timeSince from '../../../shared/utilities/time-since';

interface User {
  _id: string | null;
  id: string;
  Column1: string;
  LastName: string;
  phone: string;
  email: string;
}

export const CustomTable = (): JSX.Element => {
  const { data: users, isLoading } = useGetUsersQuery(0);

  const history = useNavigate();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleRowClick = (record: User) => {
    const { _id } = record;
    history(`/user/detail/${_id}`);
  };

  const handleMouseEnter = (record: User) => {
    const { _id } = record;
    setSelectedRow(_id);
  };

  const handleMouseLeave = () => {
    setSelectedRow(null);
  };


  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Profile Picture',
      dataIndex: 'profilePicture',
      key: 'profilePicture',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title:"Created",
      dataIndex:"updatedAt",
      key:"updatedAt",
      render:(updatedAt:any)=>timeSince(updatedAt)
    },
    {
      title: 'Active',
      dataIndex: 'state',
      key: 'state',
      render:(state:any)=>state==='Active'?"Yes":"No"

    },
    {
      title: '',
      dataIndex: '',
      key: 'arrow',
      render: (_: any, record: User) => (
        <RightOutlined
          className={`arrow-icon ${selectedRow === record._id ? 'visible' : 'invisible'}`}
        />
      ),
    },
  ];

  const rowProps = (record: User): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => handleRowClick(record),
      onMouseEnter: () => handleMouseEnter(record),
      onMouseLeave: handleMouseLeave,
      className: `cursor-pointer ${selectedRow === record._id ? 'bg-gray-100' : ''}`,
    };
  };
  

  return (
    <Table<User>
      dataSource={users?.data?.users??[]}
      columns={columns}
      loading={isLoading}
      onRow={rowProps}
      rowKey="_id"
    />
  );
};

export default CustomTable;
