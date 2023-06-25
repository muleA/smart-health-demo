import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, CaretDownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, SettingOutlined, EditOutlined, FileAddOutlined, FolderOutlined, BellOutlined, UnorderedListOutlined } from '@ant-design/icons';
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

  const renderContent = () => {
    switch (selectedMenu) {
      case "1":
        return <ProfileWrapper />;
      case "2":
        return <MyApplications />;
      case "3":
        return <MyLicenses />;
      case "5":
        return <Notification />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo text-center"></div>
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
          <Menu.Item key="3" icon={<UnorderedListOutlined />}>
            <Link to="/my-applications">My Applications</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<FileAddOutlined />}>
            <Link to="/new-application">New Applications</Link>
          </Menu.Item>

          <Menu.Item key="5" icon={<FolderOutlined />}>
            <Link to="/my-archives">My Archives</Link>
          </Menu.Item>

          <Menu.Item key="6" icon={<BellOutlined />}>
            <Link to="/settings">Notifications</Link>
          </Menu.Item>
          <Menu.Item key="7" onClick={logOut} icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
      <Header
  className="bg-gray-200"
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '24px'
  }}
>
  <div className="flex items-center">
    {React.createElement(
      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
      {
        className:
          "p-0 text-2xl leading-none cursor-pointer transition-colors",
        onClick: toggle,
      }
    )}
  </div>

  <div className="flex gap-2 items-center">
    <Dropdown overlay={accountMenu} trigger={['hover']}>
      <a className="ant-dropdown-link text-primary" onClick={(e) => e.preventDefault()}>
        <UserOutlined style={{ fontSize: '30px' }} />
        <span></span>
      </a>
    </Dropdown>
    <CaretDownOutlined className="hover:cursor-pointer text-primary ml-1" />
    <div className="text-primary">{session?.userInfo?.firstName}</div>
    <div className="text-primary">{session?.userInfo?.middleName}</div>

  </div>
</Header>

        <Content style={{ margin: "16px" }}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/banner" element={<Banner />}></Route>
            <Route path="/my-profile" element={<ProfileWrapper />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/new-application" element={<StepperComponent />} />
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
