/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, CaretDownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, SettingOutlined, EditOutlined, FileAddOutlined, FolderOutlined, BellOutlined, UnorderedListOutlined, DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import MyApplications from './my-applications';
import MyLicenses from './my-archives';
import ProfileWrapper from './profile-wrapper';
import { useAuth } from '../../shared/auth/use-auth';
import HomePage from './Home/home-page';
import Banner from '../../pages/banner';
import StepperComponent from './application-form';
import ApplicationDetail  from './application-detail';
import Archives from './my-archives';
import Notification from './notification';
import ApplicationForm from './application-form';

const { Header, Content, Sider } = Layout;

const PortalNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed((prev) => !prev);
  };
  const { logOut } = useAuth();
  const router = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("1"); // Track the selected menu item

  const handleLogout = () => {
    logOut();
    router("/");
  };

  const handleMenuSelect = ({ key }: any) => {
    setSelectedMenu(key);
  };
  const { session } = useAuth();
  const accountMenu = (
    <Menu className="text-primary">
      <Menu.Item key="1" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
    </Menu>
  );

 

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
   <div className="flex text-600 flex-col  h-14 bg-white  shadow-lg  border-b justify-center items-center">
<img src={process.env.PUBLIC_URL + '/logo.jpg'} alt="Logo"  height="100%" width={"100%"} />
</div>
        <Menu
          mode="vertical"
          className="mt-2"
          theme="light"
          defaultSelectedKeys={["1"]}
          onSelect={handleMenuSelect}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/my-profile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<FileAddOutlined />}>
            <Link to="/new-application">New Applications</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UnorderedListOutlined />}>
            <Link to="/my-applications">My Applications</Link>
          </Menu.Item>
          

          <Menu.Item key="5" icon={<FolderOutlined />}>
            <Link to="/my-archives">My Archives</Link>
          </Menu.Item>

          {/* <Menu.Item key="6" icon={<BellOutlined />}>
            <Link to="/settings">Notifications</Link>
          </Menu.Item> */}
          <Menu.Item key="7" onClick={logOut} icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>

   <div className="flex items-center justify-between bg-white  border-b h-14 shadow-2xl">
  <div className="flex items-center">
    <div className="bg-primary text-xs text-white rounded-full p-1">
      {React.createElement(
        collapsed ? DoubleRightOutlined : DoubleLeftOutlined,
        {
          className:
            "p-0 text-lg leading-none cursor-pointer transition-colors",
          onClick: toggle,
        }
      )}
    </div>
  </div>

  <a href=''
    className="ant-dropdown-link mr-5 flex hover:cursor-pointer items-center"
    onClick={(e) => e.preventDefault()}
  >
    <Dropdown overlay={accountMenu} trigger={["click"]}>
      <div className="flex items-center">
        <UserOutlined className="text-lg text-primary"/>
        <div className=" text-lg ml-2 mt-1 text-primary"> {session?.userInfo?.firstName}</div>
        <div className=" text-lg ml-2 mt-1 text-primary"> {session?.userInfo?.middleName}</div>
        <CaretDownOutlined className="hover:cursor-pointer text-primary mt-1" />
      </div>
    </Dropdown>
  </a>
</div>

        <Content style={{ margin: "16px" }}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/banner" element={<Banner />}></Route>
            <Route path="/my-profile" element={<ProfileWrapper />} />
            <Route path="/new-application" element={<ApplicationForm />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/my-archives" element={<Archives />} />
            <Route path="my-applications/:id" element={<ApplicationDetail />} />
            {/* Add more routes here */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PortalNavigation;
