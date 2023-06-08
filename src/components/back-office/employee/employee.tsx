import {
  AlignRightOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  FilterOutlined,
  FolderOutlined,
  MoreOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Input,
  Menu,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

function Employee() {
  const navigate = useNavigate();
  const { Search } = Input;

  const menu = () => {
    return (
      <Menu style={{ width: '200px' }}>
        <div className='text-center font-bold text-lg'> By Active</div>
        <Divider className='m-2'/>
        <Menu.Item>
        <Checkbox >Active</Checkbox>
        </Menu.Item>
        <Menu.Item>
        <Checkbox >Inactive</Checkbox>
        </Menu.Item>
        <div className='text-center font-bold text-lg'> By Archive</div>
        <Divider className='m-2'/>
        <Menu.Item>
        <Checkbox >Archived</Checkbox>
        </Menu.Item>
        <Menu.Item>
        <Checkbox >Restored</Checkbox>
        </Menu.Item>
      </Menu>
    );
  };

  const rows = [
    {
      id:"1",
      accountId:"JB-14541",
      firstName: 'John ',
      middleName: ' Brown',
      lastName: 'John ',
      gender:'male',
      city:'United States',
      subCity:'Arizona',
      wereda:'5',
      kebele:'14',
      phone: '+12354545',
      email:'john@gmail.com',
      houseNumber:'1234',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      status: ['Yes'],
    },
    {
      id:"2",
      accountId:"JB-14542",
      firstName: 'John ',
      middleName: ' Brown',
      lastName: 'John ',
      gender:'male',
      city:'United States',
      subCity:'Arizona',
      wereda:'5',
      kebele:'14',
      phone: '+12354545',
      email:'john@gmail.com',
      houseNumber:'1234',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      status: ['Yes'],
    },
    {
      id:"3",
      accountId:"JB-14543",
      firstName: 'John ',
      middleName: ' Brown',
      lastName: 'John ',
      gender:'male',
      city:'United States',
      subCity:'Arizona',
      wereda:'5',
      kebele:'14',
      phone: '+12354545',
      email:'john@gmail.com',
      houseNumber:'1234',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      status: ['No'],
    },
    {
      id:"4",
      accountId:"JB-14544",
      firstName: 'Kate ',
      middleName: ' Brown',
      lastName: 'Kate ',
      gender:'male',
      city:'United States',
      subCity:'Arizona',
      wereda:'5',
      kebele:'14',
      phone: '+12354545',
      email:'john@gmail.com',
      houseNumber:'1234',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      status: ['Yes'],
    },
    {
      id:"5",
      accountId:"JB-14545",
      firstName: 'Smith ',
      middleName: ' Brown',
      lastName: 'Smith ',
      gender:'male',
      city:'United States',
      subCity:'Arizona',
      wereda:'5',
      kebele:'14',
      phone: '+12354545',
      email:'john@gmail.com',
      houseNumber:'1234',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"Smith Snow",
      status: ['Yes'],
    },
    {
      id:"6",
      accountId:"JB-14546",
      firstName: 'Samantha ',
      middleName: ' Brown',
      lastName: 'Samantha ',
      gender:'male',
      city:'United States',
      subCity:'Arizona',
      wereda:'5',
      kebele:'14',
      phone: '+12354545',
      email:'john@gmail.com',
      houseNumber:'1234',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      status: ['No'],
    },
  ];
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Account Id',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text:any) => (
        <a>
          {text}
        </a>
      ),
      sorter: (a:any, b:any) => a.firstName.length - b.firstName.length,
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      key: 'middleName', },
    
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName', },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender', },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city', },
          {
            title: 'Sub City',
            dataIndex: 'subCity',
            key: 'subCity', },
            {
              title: 'Wereda',
              dataIndex: 'wereda',
              key: 'wereda', },
                          
              {
                title: 'Kebele',
                dataIndex: 'kebele',
                key: 'kebele',
              },{
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
              },{
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
              },{
                title: 'House Number',
                dataIndex: 'houseNumber',
                key: 'houseNumber',
              },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Created By', dataIndex: 'createdBy', key: 'createdB',
     
    },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    { title: 'Updated By', dataIndex: 'updatedBy', key: 'updatedBy' },
   
    { title: 'Deleted At', dataIndex: 'deletedAt', key: 'deletedAt' },
    { title: ' Deleted By', dataIndex: 'deletedBy', key: 'deletedBy'},
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status:any) => (
        <span>
          {status.map((tag:any) => {
            let color = tag.length;
            if (tag === 'Yes') {
              color = 'green';
            } else if (tag === 'No') {
              color = 'volcano';
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
      dataIndex: 'action',
      key: 'action',
      render: (action:any) => {
        return (
          <>
                    <RightOutlined/>

          </>
        );
      },
    },
  ];

  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg " style={{width: "82vw"}}>
      <div className="flex header justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-blue-400">
            Employee
          </span>
        </div>
        <div className="flex">
            <div>
              <Button onClick={() =>navigate('/add-employee')} className="bg-blue-500 flex justify-between">
              <PlusOutlined className="py-1 px-1 text-white" />
            <div className="text-white"> New Employee</div>
          </Button>
            </div>
        </div>
      </div>
        <Divider/>
      <div className="flex header justify-between">
        <div className="flex flex-col">
        </div>

        <div className="flex">
          <div className="py-4 flex gap-4">
            <div>
              <Search placeholder="Search" style={{ width: 300 }} />
            </div>
            <Dropdown overlay={menu}>
                <Button>
                  <Space>
                    <FilterOutlined className='pb-1'/>
                    Filter
                    <DownOutlined className='pb-1' />
                  </Space>
                </Button>
              </Dropdown>
          </div>
        </div>
      </div>
      <div>
        <div >
            <Table dataSource={rows} columns={columns}  scroll={{ x: "calc(500px + 50%)" }}
              onRow={() => {
                return {
                  onClick: (event) => {navigate('/update-employee') },
                };
                
              }}
               />
      
        </div>
      </div>
    </div>
  );
}

export default Employee;
