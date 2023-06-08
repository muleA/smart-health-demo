import { SaveOutlined } from '@ant-design/icons';
  import {Button,Form,Input,Select} from 'antd';
  import React, { useEffect, useMemo, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  const { Option } = Select;
  
  function EmployeeForm() {
    const navigate = useNavigate();
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle initialValue={+251}>
        <Select style={{ width: 70 }}>
          <Option value="+251">+251</Option>
          <Option value="+123">+87</Option>
        </Select>
      </Form.Item>
    );
    return (
     <div>
      <Form
        layout="vertical"
        id="Role_info"
        // onFinish={onFinish}
      >
        <div>
          <hr style={{ margin: '5px 0px 15px 0px ' }} />
          </div>
        <Form layout="vertical">
          <div className="grid grid-cols-3 gap-2 w-full">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your First Name!' }]}
            >
              <Input  placeholder="First Name"/>
            </Form.Item>
            <Form.Item
              label="Middle Name"
              name="middleName"
              rules={[{ required: true, message: 'Please input your Middle Name!' }]}
            >
              <Input placeholder="Middle Name"/>
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your Last Name!' }]}
            >
              <Input placeholder="Last Name"/>
            </Form.Item>
            <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
            <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}     
            >
              <Input placeholder="Email Address"/>
            </Form.Item>
           
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your City!' }]}

            >
              <Input  placeholder="City"/>
            </Form.Item>  
            <Form.Item
              label="Sub City"
              name="subCity"
              rules={[{ required: true, message: 'Please input your Sub City!' }]}

            >
              <Input  placeholder="Sub City"/>
            </Form.Item>
            <Form.Item
              label="Wereda"
              name="wereda"
              rules={[{ required: true, message: 'Please input your Wereda!' }]}

            >
              <Input  placeholder="Wereda"/>
            </Form.Item>
            <Form.Item
              label="Kebele"
              name="kebele"
              rules={[{ required: true, message: 'Please input your Kebele!' }]}

            >
              <Input  placeholder="Kebele"/>
            </Form.Item>
            <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder='jhon@gmail.com'/>
      </Form.Item>
      <Form.Item
              label="House Number"
              name="houseNumber"
              rules={[{ required: true, message: 'Please input your House Number!' }]}

            >
              <Input  placeholder="12345"/>
            </Form.Item>
          </div>
        </Form>
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
  
  export default EmployeeForm;
  