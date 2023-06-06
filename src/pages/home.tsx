import React, { useState } from "react";
import { Layout, Menu, Button, Select } from "antd";
import { DownOutlined, LoginOutlined } from "@ant-design/icons";
import { SafetyCertificateOutlined, UserAddOutlined } from "@ant-design/icons";
import LoginForm from "./login/login-form";
import RegistrationForm from "./login/registration-form";
import Carousel from "./banner";
import HowItWorks from "./how-it-works";
import { Registration } from "./login/registration";

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const [activeMenuKey, setActiveMenuKey] = useState("1");
  const handleRegistration = () => {
    setActiveMenuKey("6");
  };
  const handleLogin = () => {
    setActiveMenuKey("5");
  };

  const { Option } = Select;

  const handleChange = (value: any) => {
    console.log(`Selected language: ${value}`);
  };

  const handleMenuClick = (key: React.SetStateAction<string>) => {
    setActiveMenuKey(key);
    // You can perform additional actions based on the menu click here
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <SafetyCertificateOutlined
              className="text-primary"
              style={{ fontSize: "24px" }}
            />
            <span className="ml-2 font-bold text-primary">Smart Health eLicense System</span>
          </div>
          <Menu
            mode="horizontal"
            className=""
            selectedKeys={[activeMenuKey]}
            onClick={({ key }) => handleMenuClick(key)}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Search Licensee(Holder)</Menu.Item>
            <Menu.Item key="3">How It Works</Menu.Item>
            <Menu.Item key="4">About Us</Menu.Item>
            
          </Menu>
          <div className="flex space-x-4">
            <Select
              defaultValue="en"
              onChange={handleChange}
              className="w-40"
              suffixIcon={<DownOutlined />}
            >
              <Option value="en">English</Option>
              <Option value="am">አማርኛ</Option>
              {/* Add more language options as needed */}
            </Select>
            <Button
              onClick={handleLogin}
              type="primary"
              className="mr-2 bg-primary flex items-center justify-center"
              icon={<LoginOutlined />}
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={handleRegistration}
              className="bg-primary flex min-w-fit cursor-pointer items-center justify-center self-center rounded border border-white py-1 text-sm text-white hover:bg-white hover:text-primary"
              icon={<UserAddOutlined />}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Header>

      <Content
        className="p-2 w-100"
        style={{
          backgroundImage: 'url("/background-image.jpg")',
          backgroundSize: "cover",
        }}
      >
        {activeMenuKey === "1" && <Carousel />}
        {activeMenuKey === "2" && (
          <h1>
            <HowItWorks />
          </h1>
        )}
        {activeMenuKey === "3" && <h1>how it works page</h1>}
        {activeMenuKey === "4" && <h1>About Us Page Content</h1>}
        {activeMenuKey === "6" && <Registration />}
        {activeMenuKey === "5" && <LoginForm />}

      </Content>
      <Footer className="text-center bg-white py-2 text-primary">
        Professional License Management &copy; {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default HomePage;
