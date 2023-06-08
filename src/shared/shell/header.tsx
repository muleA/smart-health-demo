import React, { useState } from "react";
import { Button, Divider, Menu, Typography } from "antd";
import {
  PoundCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";

const { SubMenu } = Menu;

const AccountMenu = () => {
  const [visible, setVisible] = useState(false);
  const { session, logOut } = useAuth();
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(`/user-management/users/detail/${session?.userInfo?.Id}`, {
      state: { user: { ...session?.userInfo, userName: session?.userInfo?.UserName } },
    });
  };

  const handleMenuClick = (e: { key: string; }) => {
    if (e.key === "logout") {
      logOut();
    }
  };

  const handleVisibleChange = (visible: boolean | ((prevState: boolean) => boolean)) => {
    setVisible(visible);
  };

  return (
    <span style={{ marginLeft: "13px" }}>
      <Button
        onClick={(e) => e.preventDefault()}
        icon={<PoundCircleOutlined style={{ fontSize: 40, color: "rgba(0, 0, 0, .3)" }} />}
        style={{ color: "grey" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "15px" }}>
          <Typography.Text  style={{ textTransform: "capitalize" }} color="text.primary">
            {session?.userInfo.FullName}
          </Typography.Text>
          <Typography.Text  style={{ textTransform: "capitalize" }} color="text.secondary" >
            {session?.userInfo.UserName}
          </Typography.Text>
        </div>
      </Button>
      <Menu
        onClick={handleMenuClick}
        style={{ minWidth: "200px" }}
      >
        <Menu.Item>
          <Typography.Text strong>{session?.userInfo.FullName}</Typography.Text>
          <Typography.Text>{session?.userInfo.UserName}</Typography.Text>
        </Menu.Item>
        <Divider />
        <Menu.Item key="settings" icon={<SettingOutlined />} onClick={handleProfile}>
          Settings
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Log Out
        </Menu.Item>
      </Menu>
    </span>
  );
};

export default AccountMenu;