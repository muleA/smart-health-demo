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
    SaveOutlined,
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
   
  function RoleForm() {
    const navigate = useNavigate();
    const { Search } = Input;
  
  
    return ( 
      <div>
      <Form
        layout="vertical"
        id="Role_info"
        // onFinish={onFinish}
      >
        <div>
          <hr style={{ margin: '5px 0px 15px 0px ' }} />
          <div className='grid grid-cols-2 gap-2'>
            <Form style={{ flex: '3.5' }}  layout="vertical">
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
              {/* <Form layout="vertical">
              <Form.Item
                name="isDefault"
                label="Is Default"
                rules={[
                  {
                    required: true,
                    message: 'Is Default is required',
                  },
                ]}
              >
                <Select defaultValue="Yes">
                  <Option value="Yes">Yes</Option>
                </Select>
              </Form.Item>
              </Form> */}
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
          <Button className="bg-blue-500 flex justify-between">
              <SaveOutlined className="py-1 px-1 text-white" />
            <div className="text-white"> Save</div>
          </Button>
        </div>
      </Form>
    </div>
    );
  }
  
  export default RoleForm;
  