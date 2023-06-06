import {
  AlignRightOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FilterOutlined,
  RightOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Input,
  Menu,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

function Role() {
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
      name: 'John Brown',
      description: 'lorem enim ad minim veris nostrud ex ea commado',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      isActive: ['Yes'],
    },
    {
      id:"2",
      name: 'Jim Green',
      description: 'lorem enim ad minim veris nostrud ex ea commado',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      isActive: ['Yes'],
    },
    {
      id:"3",
      name: 'Joe Black',
      description: 'lorem enim ad minim veris nostrud ex ea commado',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      isActive: ['No'],
    },
    {
      id:"4",
      name: 'John Brown',
      description: 'lorem enim ad minim veris nostrud ex ea commado',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      isActive: ['Yes'],
    },
    {
      id:"5",
      name: 'Jim Green',
      description: 'lorem enim ad minim veris nostrud ex ea commado',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      isActive: ['Yes'],
    },
    {
      id:"6",
      name: 'Joe Black',
      description: 'lorem enim ad minim veris nostrud ex ea commado',
      updatedAt: '2014-12-24 23:12:00',
      createdAt: '2014-12-28 23:12:00',
      deletedAt: '2014-12-28 23:12:00',
      updatedBy:"Adam Smith",
      createdBy:"Heather Smith",
      deletedBy:"John Snow",
      isActive: ['No'],
    },
  ];
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => (
        <a>
          {text}
        </a>
      ),
      sorter: (a:any, b:any) => a.name.length - b.name.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
      title: 'Is Active',
      key: 'isActive',
      dataIndex: 'isActive',
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
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
      <div className="flex header justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-blue-400">
            Role
          </span>
        </div>
        <div className="flex">
            <div>
              <Button onClick={() =>navigate('/add-role')} className="bg-blue-500 flex justify-between">
              <PlusOutlined className="py-1 px-1 text-white" />
            <div className="text-white"> New Role</div>
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
        <div className="py-4 flex gap-4">
            <Table dataSource={rows} columns={columns}   
            onRow={() => {
              return {
                onClick: (event) => {navigate('/update-role') },
              };
            }} />
      
        </div>
      </div>
    </div>
  );
}

export default Role;
