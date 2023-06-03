import React from 'react';
import { Button, Divider, Select, Space, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';


function TableCard() {
  const navigate = useNavigate();
  

  const columns = [
    {
      title: 'License Name',
      dataIndex: 'licenseName',
      key: 'licenseName',
      render: (text:any) => <a className='text-blue-500'>{text}</a>,
      sorter: (a:any, b:any) => a.licenseName.length - b.licenseName.length,
    },
    { title: 'Entry In', dataIndex: 'entryDate', key: 'entryDate' },
    { title: 'Expire Out', dataIndex: 'expireDate', key: 'dataIndex' },
    {
      title: 'License Code ',
      dataIndex: 'licenseCode',
      key: 'licenseCode',
      sorter: (c:any, d:any) => c.licenseCode.length - d.licenseCode.length,
    },

    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status:any) => (
        <span>
          {status.map((tag:any) => {
            let color = tag.length;
            if (tag === 'Accepted') {
              color = 'green';
            } else if (tag === 'Rejected') {
              color = 'volcano';
            } else if (tag === 'Pending') {
              color = 'geekblue';
            }

            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: () => {
        return (
          <>
            <Space size="middle">
        <a className='text-blue-500'>See More</a>
      </Space>
          </>
        );
      },
    },
  ];
  const rows = [
    {
      key:"1",
      licenseName: 'John Brown',
      licenseCode: 'SDD',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Accepted'],
    },
    {
      key:"2",
      licenseName: 'Jim Green',
      licenseCode: 'STT',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Rejected'],
    },
    {
      key:"3",
      licenseName: 'Joe Black',
      licenseCode: 'DDS',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Pending'],
    },
    {
      key:"4",
      licenseName: 'John Brown',
      licenseCode: 'SDD',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Accepted'],
    },
    {
      key:"5",
      licenseName: 'Jim Green',
      licenseCode: 'STT',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Accepted'],
    },
    {
      key:"6",
      licenseName: 'Joe Black',
      licenseCode: 'DDS',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Rejected'],
    },
    {
      key:"3",
      licenseName: 'Joe Black',
      licenseCode: 'DDS',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Pending'],
    },
    {
      key:"6",
      licenseName: 'Joe Black',
      licenseCode: 'DDS',
      entryDate: '2014-12-24 23:12:00',
      expireDate: '2014-12-28 23:12:00',
      status: ['Rejected'],
    },
  ];
  return (
    <div className="">
      <div className="bg-white p-4 rounded-2xl shadow-lg pb-8">
     <div className='flex justify-between'>
      <div className=" font-bold gap-2 text-blue-400 text-2xl ">Licenses </div>
      <Button className='bg-blue-500 '  >
             <div className='text-white' > Add new </div>
            </Button>
     </div>

        <Divider className='m-2'/>
        <Table dataSource={rows} columns={columns} />
      </div>
    </div>
  );
}

export default TableCard;
