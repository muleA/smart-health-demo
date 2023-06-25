import {
  CarOutlined,
  CaretDownOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ShopOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../shared/auth/use-auth";
import HomePage from "../pages/home";
import { User } from "../pages/back-office/user";
import { UserDetail } from "./back-office/user/detail";
import Sidebar from "../shared/shell/sidebar";
import { Roles } from "./back-office/role/role";
import DetailRole from "./back-office/role/detail.";
import NewRole from "./back-office/role/new-role";
import { PermissionLists } from "../pages/back-office/permissions/permission";
import DetailPermissions from "./back-office/permission/detail.";
import NewPermission from "./back-office/permission/new-permissions";
import { EmployeeDetailsPage } from "../pages/back-office/employee/detail";
import { EmployeesPage } from "../pages/back-office/employee/employees";
import { NewEmployee } from "./back-office/employee/new-employee";
import { License } from "./back-office/license/license";
import { DetailLicensePage } from "../pages/back-office/license/detail";
import { ApplicationDetailPage } from "../pages/back-office/application/detail";
import { ArchivedUsers } from "./back-office/archives/user/archived-user";
import { ArchivedUserDetail } from "./back-office/archives/user/archived-user-detail";
import { ArchivedEmployees } from "./back-office/archives/employee/archived-employees";
import { ArchivedEmployeeDetails } from "./back-office/archives/employee/archived-employee-detail";
import { ArchivedLicense } from "./back-office/archives/license/archived-license";
import ArchivedLicenseDetail from "./back-office/archives/license/archived-license-detail.";
import { ArchivedApplication } from "./back-office/archives/application/archived-application";
import ArchivedApplicationDetail from "./back-office/archives/application/archived-application-detail";
import { BackOfficeApplications } from "./back-office/application/application";
import SideBarLogo from "../shared/sidebar-logo";
import * as Icon from '@ant-design/icons'
import { useTranslation } from "react-i18next";

const { Sider, Content, Header, Footer } = Layout;
const { SubMenu } = Menu;

const BackOfficeLayoutWrapper = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logOut } = useAuth();
  const { t } = useTranslation();

  const handleLogOut = (): void => {
    logOut(); 
  };
  const toggle = () => {
    setCollapsed((prev) => !prev);
  };
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSnippets.length - 1;
    return (
      <Breadcrumb.Item key={url}>
        {isLast ? <span>{snippet}</span> : <Link to={url}>{snippet}</Link>}
      </Breadcrumb.Item>
    );
  });

  const accountMenu = (
    <Menu className="text-primary">
      <Menu.Item key="1" onClick={handleLogOut} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <a href="/profile">My Profile</a>
      </Menu.Item>
    </Menu>
  );
  const currentDate: Date = new Date();
  const formattedDate = `${currentDate.toLocaleString("en-us", {
    month: "short",
  })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  const { session } = useAuth();
  console.log("session", session?.userInfo?.userName);
   const menus= [
    
      {
          name: t("dashboard"),
          path: "/dashboard",
          icon: Icon.DashboardOutlined,
      },
      {
          name: t("role"),
          path: "/roles",
          icon: Icon.UsergroupAddOutlined,
      },
      {
        name: t("permission"),
        path: "/permissions",
        icon: Icon.KeyOutlined,
    },
      {
          name: t("users"),
          path: "/users",
          icon: Icon.UserOutlined,
      },
      {
          name: t("employee"),
          path: "/employees",
          icon: Icon.TeamOutlined,
      },
      {
          name: t("application"),
          path: "/applications",
          icon: Icon.AppstoreOutlined,
      },
      {
          name: "License",
          path: "/licenses",
          icon: Icon.BookOutlined,
      },
    {
      name: "Archives",
      path: "/archives",
      icon: Icon.CiOutlined,
      child: [
        {
          name: "Users",
          path: "/archived-users",
          icon: Icon.UserOutlined,
        },
        {
          name: "employees",
          path: "/archived-employees",
          icon: Icon.TeamOutlined,
        },
        {
          name: "applications",
          path: "/archived-applications",
          icon: Icon.AppstoreOutlined,
        },
        {
          name: "license",
          path: "/archived-license",
          icon: Icon.BookOutlined,
        },
  
      ],
    
    },
  
  ];
  
  return (
    <div className="flex bg-gray-200 text-sm">
      <Sider
        width={250}
        className=" bg-gray-50"
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
      >
        <div className="flex flex-col  justify-center items-center py-4">
       <SideBarLogo/>
        </div>
        <Sidebar menus={menus} />
      </Sider>

      <div className="flex-1 bg-white bg-gray-100" style={{ minHeight: "100vh" }}>
        {/*  */}
        <Header className="bg-gray-200  top-0 z-10 flex justify-between items-center">
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
          <div className="flex">
            <Dropdown overlay={accountMenu} trigger={["click"]}>
              <a
                className="ant-dropdown-link text-primary"
                onClick={(e) => e.preventDefault()}
              >
                <UserOutlined style={{ fontSize: "20px" }} />
                <CaretDownOutlined className="hover:cursor-pointer text-primary" />
              </a>
            </Dropdown>
            <div className="text-primary"> {session?.userInfo?.firstName}</div>
            <div className="text-primary"> {session?.userInfo?.middleName}</div>

          </div>

          {/*  <div className="flex items-center">
            <Dropdown menu={accountMenu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar />
                </Space>
              </a>
            </Dropdown>
            {session?.userInfo?.data?.data?.user?.lastName}
          </div> */}
        </Header>
        {/*  */} {/* Body */}
        <Content className="py-2 px-4">
          {/*  Page Title and Breadcrumb */}
          <div className="flex">
            <div className="flex-1">
              <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbItems}
              </Breadcrumb>
            </div>
            <div className="flex flex-auto justify-end">
              {/* Current time */}
              <span className="mr-2">Today is {formattedDate}</span>
            </div>
            {/* Content */}
          </div>
          <div className="py-2 min-h-screen">
            {children}
            <Routes>
              <Route path="/employees" element={<EmployeesPage />} />
              <Route
                path="employees/detail/:id"
                element={<EmployeeDetailsPage />}
              />
              <Route path="employees/new" element={<NewEmployee />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="roles/detail/:id" element={<DetailRole />} />
              <Route path="roles/new" element={<NewRole />} />
              <Route path="/licenses" element={<License />} />
              <Route path="license/detail/:id" element={<DetailLicensePage />} />
              <Route path="/applications" element={<BackOfficeApplications />} />
              <Route path="application/detail/:id" element={<ApplicationDetailPage />} />
              <Route
                path="permissions/detail/:id"
                element={<DetailPermissions />}
              />
              <Route path="permissions/new" element={<NewPermission />} />
              <Route path="/permissions" element={<PermissionLists />} />
              <Route path="/users" element={

              <User />
              
              } />
              <Route path="users/detail/:id" element={<UserDetail />} />
              <Route path="/archives/archived-users" element={<ArchivedUsers />} />
            <Route path="archived-users/detail/:id" element={<ArchivedUserDetail />} />
            <Route path="/archives/archived-employees" element={<ArchivedEmployees />} />
            <Route path="archived-employees/detail/:id" element={<ArchivedEmployeeDetails />} />
            
            <Route path="/archives/archived-license" element={<ArchivedLicense />} />
            <Route path="archived-license/detail/:id" element={<ArchivedLicenseDetail />} />
            <Route path="/archives/archived-applications" element={<ArchivedApplication />} />
            <Route path="archived-applications/detail/:id" element={<ArchivedApplicationDetail />} />



              {/* Add more routes here */}
            </Routes>
          </div>
        </Content>
        <Footer className="mx-auto text-center ">
          {" "}
          &copy; {new Date().getFullYear()} {""}All Rights Reserved Technologies{" "}
        </Footer>
      </div>
    </div>
  );
};

export default BackOfficeLayoutWrapper;
