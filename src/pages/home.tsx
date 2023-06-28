import React, { useRef, useState } from "react";
import { Layout, Menu, Button, Select, Tour } from "antd";
import {
  DownOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import LoginForm from "./login/login-form";
import Carousel from "./banner";
import { Registration } from "./login/registration";
import { useTranslation } from "react-i18next";
import SearchLicensee from "./search";
import { useGetUsersQuery } from "../components/portal.query";
import { AboutUs } from "./about";
import axios from "axios";
import PortalNavigation from "../components/portal/home-navbar";
import { useAuth } from "../shared/auth/use-auth";
const { Header, Content, Footer } = Layout;

const LandingPage = () => {
  const [activeMenuKey, setActiveMenuKey] = useState("1");
const {session}=useAuth()
  const handleRegistration = () => {
    setActiveMenuKey("6");
  };

  const handleLogin = () => {
    setActiveMenuKey("5");
  };

  const { Option } = Select;

  const handleMenuClick = (key: React.SetStateAction<string>) => {
    setActiveMenuKey(key);
    // You can perform additional actions based on the menu click here
  };

  const { i18n } = useTranslation();

  const changeLanguage = (event:any) => {
    const selectedLanguage = event;
    i18n.changeLanguage(selectedLanguage);
  };
  const { t } = useTranslation();

  return (
    <Layout className="min-h-screen">
    <Header className="bg-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SafetyCertificateOutlined className="text-primary" style={{ fontSize: "24px" }} />
          <span className="ml-2 font-bold text-primary">{t('license')}</span>
        </div>
        <Menu
          mode="horizontal"
          className="hidden md:flex"
          selectedKeys={[activeMenuKey]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="1">{t('home')}</Menu.Item>
          <Menu.Item key="2">{t('search_licensee')}</Menu.Item>
          <Menu.Item key="4">{t('about_us')}</Menu.Item>
         {session?(<>
          <Menu.Item key="7">{t('Profile')}</Menu.Item>
         </>):null} 

        </Menu>
        <div className="flex space-x-4">
          {session ?(<>
          <PortalNavigation/>
          </>):null}
          <Select
            defaultValue="en"
            onChange={changeLanguage}
            className="w-30"
            suffixIcon={<DownOutlined />}
          >
            <Option value="en">English</Option>
            <Option value="am">አማርኛ</Option>
           


            {/* Add more language options as needed */}
          </Select>
          {!session?(<>
            <Button
            onClick={handleLogin}
            type="primary"
            className="mr-2 bg-primary flex items-center justify-center"
            icon={<LoginOutlined />}
          >
            {t('login')}
          </Button>
          <Button
            type="primary"
            onClick={handleRegistration}
            className="bg-primary flex min-w-fit cursor-pointer items-center justify-center self-center rounded py-1 text-sm text-white hover:bg-white hover:text-primary"
            icon={<UserAddOutlined />}
          >
            {t('sign_up')}
          </Button>
          </>):null}
          
        </div>
      </div>
      <div className="md:hidden">
        <Menu
          mode="horizontal"
          className=""
          selectedKeys={[activeMenuKey]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="1">{t('home')}</Menu.Item>
          <Menu.Item key="2">{t('search_licensee')}</Menu.Item>
          <Menu.Item key="4">{t('about_us')}</Menu.Item>
          {session?(<>
          <Menu.Item key="7">{t('Profile')}</Menu.Item>
         </>):null} 
        </Menu>
      </div>
    </Header>
  
    <Content
      className="p-2 w-100"
      style={{
        backgroundImage: 'url("/background-image.jpg")',
        backgroundSize: "cover",
      }}
    >
      {activeMenuKey === "1" && <Carousel  />}
      {activeMenuKey === "2" && <SearchLicensee />}
      {activeMenuKey === "4" && <AboutUs/>}
      {activeMenuKey === "6" && <Registration />}
      {activeMenuKey === "5" && <LoginForm />}
      
      {activeMenuKey === "7" &&  session && <PortalNavigation />}

    </Content>
    <Footer className="text-center bg-white py-2 text-primary">
      Professional License Management &copy; {new Date().getFullYear()} Powered By Tria PLC
    </Footer>
  </Layout>
  
  );
};

export default LandingPage;
