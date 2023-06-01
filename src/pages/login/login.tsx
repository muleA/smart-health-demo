import { Typography, Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginImage from "../../assets/images/login.webp";
import { useAuth } from "../../shared/auth/use-auth";

export const Login = () => {
  const navigate = useNavigate();
  const { submitLoginRequest,selectIsLoading } = useAuth();

  const onFinish = async (values: any) => {
    try {
      await submitLoginRequest(values);
      // Handle successful login
      navigate("/dashboard"); // Example: Redirect to dashboard on success
    } catch (error) {
      // Handle error during login
  };
}

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100">
        <Typography.Title className="text-3xl mb-6">Login</Typography.Title>
        <Form className="w-2/3" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter email address" },
              { max: 40, message: "Max size of email is 40" },
              {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-500" />}
              placeholder="john@example.com"
              size="large"
              className="mb-4"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="text-gray-500" />}
              type="password"
              placeholder="Password"
              size="large"
              className="mb-4"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              loading={selectIsLoading} // Set the loading prop
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex justify-center items-center w-1/2">
        <img className="w-3/4" src={LoginImage} alt="Login illustration" />
      </div>
    </div>
  );
};
