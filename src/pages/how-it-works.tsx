import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

function HowItWorks() {
  
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg m-8">
    <Form
        layout="vertical"
        size="middle"
        id=""
        // onFinish={onFinish}
        style={{ height: '100%' }}
        initialValues={{}}
      >
        <div className="flex flex-col bg-white p-4 rounded gap-2">
          <div className="text-2xl font-bold text-blue-400">Search</div>
          <p>
           <Typography>To perform a license look-up for an individual or business, please provide the required information below and click on the 'Search' button. The requested information will be displayed at the bottom of the screen. You can access the record of an individual or business by clicking on the provided link for each record.</Typography>
            <hr style={{ margin: '5px 0px 15px 0px ' }} />
          </p>
          <div className="flex flex-col gap-4">
            <div className="text-l font-bold py-2">
              License information's
              <hr style={{ margin: '5px 0px 15px 0px ' }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Form layout="vertical">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'First Name is required',
                    },
                  ]}
                >
                  <Input placeholder="example" />
                </Form.Item>
              </Form>
              <Form layout="vertical">
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Last Name is required',
                    },
                  ]}
                >
                  <Input placeholder="example" />
                </Form.Item>
              </Form>
              <Form layout="vertical">
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Email is required',
                    },
                  ]}
                >
                  <Input placeholder="example" />
                </Form.Item>
              </Form>
              <Form layout="vertical" initialValues={{ prefix: '+251' }}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Phone Number is required',
                    },
                  ]}
                >
                  <Input placeholder="example" />
                </Form.Item>
              </Form> 
                <Form layout="vertical">
                  <Form.Item label="Country" name="country">
                    <Input placeholder="United State of America" />
                  </Form.Item>
                </Form>
                <Form layout="vertical">
                  <Form.Item label="State" name="state">
                    <Input placeholder="Kansas" />
                  </Form.Item>
                </Form>
                <Form layout="vertical">
                  <Form.Item label="City" name="city">
                    <Input placeholder="South Adelinemouth" />
                  </Form.Item>
                </Form>
            </div>
            <div className=" grid grid-cols-2 gap-2">
              <Form layout="vertical">
              <Form.Item label="License Number">
        <Form.Item
          name="licenseNumber"
          rules={[
            {
              required: false,
              message: 'License Number is required',
            },
          ]}
        >
          <Input placeholder="ACD-120-5263-152" id="licenseNumber" />
        </Form.Item>
      </Form.Item>
              </Form>
              <Form layout="vertical">
              <Form.Item label="License Type">
        <Form.Item
          name="licenseType"
          rules={[
            {
              required: false,
              message: 'License Type is required',
            },
          ]}
        >
          <Input placeholder="AAD"  id="licenseType" />
        </Form.Item>
      </Form.Item>
              </Form>
            </div>
          </div>
          <div className="flex gap-4 justify-end font-bold pt-8 ">
          <Button className='bg-blue-500'>
             <div className='text-white'> Search </div>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default HowItWorks;
