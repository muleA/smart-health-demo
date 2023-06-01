import { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  DownOutlined,
  BellOutlined,
  OrderedListOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../shared/auth/use-auth';
import MyApplications from './user/my-applications';
import UserProfile from './user/user-profile';
import MyLicenses from './user/my-license';
import Notifications from './user/notification';
import AccountSettings from './user/account-settings';
import ProfileWrapper from './user/profile-wrapper';
import React from 'react';
import LicenseForm from './user/application-form';

const { Header, Content, Sider } = Layout;

const UserPage = () => {
    const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed((prev) => !prev);
  };
  const { logOut } = useAuth();
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState('1'); // Track the selected menu item

  const handleLogout = () => {
    logOut();
    router.push('/');
  };

  const handleMenuSelect = ({ key }:any) => {
    setSelectedMenu(key);
  };

  const accountMenu = (
    <Menu className="text-primary">
      <Menu.Item key="1" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link href="/profile">My Profile</Link>
      </Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return <ProfileWrapper />;
      case '2':
        return <MyApplications />;
      case '3':
        return <MyLicenses />;
      case '4':
        return <Notifications />;
      case '5':
        return <AccountSettings />;
        case '7':
            return <LicenseForm />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light" 
      trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="logo text-center"></div>
        <Menu
          mode="vertical"
          className="mt-2"
          theme="light"
          defaultSelectedKeys={['1']}
          onSelect={handleMenuSelect}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/my-profile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<OrderedListOutlined />}>
            <Link href="/my-applications">My Applications</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<OrderedListOutlined />}>
            <Link href="/new-application">New Applications</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SafetyCertificateOutlined />}>
            <Link href="/my-licenses">Professional Licenses</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BellOutlined />}>
            <Link href="/notification">Notifications</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            <Link href="/settings">Account Settings:</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            <Link href="/logout">Logout</Link>
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
  
  <div>
    <Dropdown overlay={accountMenu} trigger={['click']}>
      <a className="ant-dropdown-link text-primary" onClick={(e) => e.preventDefault()}>
        <UserOutlined style={{ fontSize: '30px' }} />
        <span></span>
      </a>
    </Dropdown>
    <CaretDownOutlined className="hover:cursor-pointer text-primary" />
  </div>
</Header>

        <Content style={{ margin: '16px' }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default UserPage;
