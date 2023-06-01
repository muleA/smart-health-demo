import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { HomeOutlined, AppstoreOutlined, GlobalOutlined } from "@ant-design/icons";
import { useAuth } from "../shared/auth/use-auth";

const PortalLayout = () => {
    const {logOut}=useAuth()
    const handleLogOut = (): void => {
      logOut();
    };
  const languageMenu = (
    <Menu>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="fr">French</Menu.Item>
      <Menu.Item key="es">Spanish</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogOut}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-between bg-blue-200 p-4">
      <div className="flex items-center">
        <Link to="/">
          <img src="../assets/images/icons8-restaurant.png" alt="Logo" className="h-8 w-auto" />
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/home" className="mr-4">
          <HomeOutlined />
        </Link>
        <Link to="/my-applications" className="mr-4">
          <AppstoreOutlined />
        </Link>
        <Dropdown overlay={languageMenu} placement="bottomRight">
          <span className="cursor-pointer">
            <GlobalOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default PortalLayout;
