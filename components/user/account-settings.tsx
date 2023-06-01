import React, { useState } from 'react';
import { Table } from 'antd';
import { useGetUsersQuery } from '../auth.query';
import { RightOutlined } from '@ant-design/icons';

interface User {
  id: string;
  Column1: string;
  LastName: string;
  phone: string;
  Email: string;
}

export const AccountSettings = (): JSX.Element => {
  const { data: users, isLoading } = useGetUsersQuery(0);
  console.log('users', users);

  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleRowClick = (record: User) => {
    const { id } = record;
/*     history(`/driver/detail/${id}`);
 */  };

  const handleMouseEnter = (record: User) => {
    const { id } = record;
    setSelectedRow(id);
  };

  const handleMouseLeave = () => {
    setSelectedRow(null);
  };

  const columns = [
    {
      title: 'license',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Plate Number',
      dataIndex: 'PlateNumber',
      key: 'PlateNumber',
    },
    {
      title: 'Average Time',
      dataIndex: 'AverageTime',
      key: 'AverageTime',
    },
    {
      title: '',
      dataIndex: '',
      key: 'arrow',
      render: (_: any, record: User) => (
        <RightOutlined
          className={`arrow-icon ${selectedRow === record.id ? 'visible' : 'invisible'}`}
        />
      ),
    },
  ];

  const rowProps = (record: User): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => handleRowClick(record),
      onMouseEnter: () => handleMouseEnter(record),
      onMouseLeave: handleMouseLeave,
      className: `cursor-pointer ${selectedRow === record.id ? 'bg-gray-100' : ''}`,
    };
  };

  return (
    <Table<User>
      dataSource={users}
      columns={columns}
      loading={isLoading}
      onRow={rowProps}
      rowKey="id"
      pagination={false}
    />
  );
};

export default AccountSettings;
