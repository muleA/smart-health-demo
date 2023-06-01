import React, { useEffect, useState } from 'react';
import { Badge, Table } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  id: string;
  Column1: string;
  LastName: string;
  phone: string;
  Email: string;
}

export const CustomTable = (): JSX.Element => {
    const [data, setData] = useState(null);
const router=useRouter()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://20.21.120.66:3000/api/user/get-application-by-userId/cdd7e427-50f0-4231-bddb-277ba7e03ea8');
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
    router.push("/my-applications")
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
      title: 'applicationType',
      dataIndex: 'applicationType',
      key: 'applicationType',
    },
    {
      title: 'applierType',
      dataIndex: 'applierType',
      key: 'applierType',
    },
    {
      title: 'comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'license',
      dataIndex: 'license',
      key: 'license',
    },
    {
      title: 'appointmentDate',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
        
        render: (status:any) => (
          <Badge
            color={status === 'SUBMITED' ? 'blue' : status === 'Rejected' ? 'red' : 'green'}
            text={status}
          />
        ),
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
      dataSource={data??[]}
      columns={columns}
      onRow={rowProps}
      rowKey="id"
      pagination={false}
    />
  );
};

export default CustomTable;
