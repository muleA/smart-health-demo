import {
    AlignRightOutlined,
    ArrowRightOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EllipsisOutlined,
    FileTextFilled,
    FolderOutlined,
    MoreOutlined,
    PlusOutlined,
  } from '@ant-design/icons';
  import {
    Breadcrumb,
    Button,
    Dropdown,
    Form,
    Input,
    Menu,
    Select,
    Space,
    Spin,
    Table,
    Tag,
  } from 'antd';
import TextArea from 'antd/es/input/TextArea';
  import React, { useEffect, useMemo, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  const { Option } = Select;
  
  function PermissionForm() {
    const navigate = useNavigate();
    const { Search } = Input;
  
  
    return (
      <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
        <div className="flex header justify-between">
            <span className="text-2xl font-bold text-blue-400">
              New Permission
            </span>
          </div>
  
          <div>
      <Form
        layout="vertical"
        id="Permission-info"
        // onFinish={onFinish}
      >
        <div>
          <hr style={{ margin: '5px 0px 15px 0px ' }} />
          <div className='grid grid-cols-2 gap-2'>
            <Form  layout="vertical">
              <Form.Item
                name="name"
                label="Name"
                style={{ margin: '5px' }}
                rules={[
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ]}
              >
                <Input style={{ width: '100%' }} />
              </Form.Item>
            </Form>
              <Form layout="vertical">
              <Form.Item
                name="isActive"
                label="Is Active"
                rules={[
                  {
                    required: true,
                    message: 'Is Active is required',
                  },
                ]}
              >
                <Select defaultValue="Yes">
                  <Option value="Yes">Yes</Option>
                </Select>
              </Form.Item>
              </Form>
            </div>
            <Form layout="vertical">
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Description is required',
                  },
                ]}
              >
                <TextArea rows={8}/>
              </Form.Item>
              </Form>
        </div>
        <div className="flex gap-4 justify-end font-bold pt-20 ">
        <Button className="bg-blue-500 ">
            <div className="text-white"> Finish </div>
          </Button>
        </div>
      </Form>
    </div>
      </div>
    );
  }
  
  export default PermissionForm;
  