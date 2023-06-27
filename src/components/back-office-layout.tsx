/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  CaretDownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../shared/auth/use-auth";
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
import { ArchivedApplication } from "./back-office/archives/application/archived-application";
import ArchivedApplicationDetail from "./back-office/archives/application/archived-application-detail";
import { BackOfficeApplications } from "./back-office/application/application";
import SideBarLogo from "../shared/sidebar-logo";
import * as Icon from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  ViewApplications,
  ViewArchives,
  ViewDashboard,
  ViewEmployee,
  ViewLicense,
  ViewRole,
  ViewUser,
  viewPermission,
} from "../shared/shell/permissions-list";
import RoutePermissionGuard from "../shared/auth/route-permission-guard";
import LicenseDetail from "./back-office/license/detail.";

const { Sider, Content, Header, Footer } = Layout;

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
  const menus = [
    {
      name: t("Dashboard"),
      path: "/dashboard",
      icon: Icon.DashboardOutlined,
      permissions: ViewDashboard,
    },
    {
      name: t("Role"),
      path: "/roles",
      icon: Icon.UsergroupAddOutlined,
      permissions: ViewRole,
    },
    {
      name: t("Permission"),
      path: "/permissions",
      icon: Icon.KeyOutlined,
      permissions: viewPermission,
    },
    {
      name: t("Users"),
      path: "/users",
      icon: Icon.UserOutlined,
      permissions: ViewUser,
    },
    {
      name: t("Employee"),
      path: "/employees",
      icon: Icon.TeamOutlined,
      permissions: ViewEmployee,
    },
    {
      name: t("Application"),
      path: "/applications",
      icon: Icon.AppstoreOutlined,
      permissions: ViewApplications,
    },
    {
      name: "License",
      path: "/licenses",
      icon: Icon.BookOutlined,
      permissions: ViewLicense,
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
          permissions: ViewArchives,

        },
        {
          name: "employees",
          path: "/archived-employees",
          icon: Icon.TeamOutlined,
          permissions: ViewArchives,

        },
        {
          name: "applications",
          path: "/archived-applications",
          icon: Icon.AppstoreOutlined,
          permissions: ViewArchives,

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
          <SideBarLogo />
        </div>
        <Sidebar menus={menus} />
      </Sider>

      <div
        className="flex-1 bg-white bg-gray-100"
        style={{ minHeight: "100vh" }}
      >
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
          <div className="flex space-x-2">
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
              <Route
                path="/employees"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewEmployee}>
                    <EmployeesPage />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="employees/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewEmployee}>
                    <EmployeeDetailsPage />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/employees/new"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewEmployee}>
                    <NewEmployee />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/roles"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewRole}>
                    <Roles />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/roles/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewRole}>
                    <DetailRole />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/roles/new"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewRole}>
                    <NewRole />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/licenses"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewLicense}>
                    <License />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/licenses/detail/:id"
                element={
                <RoutePermissionGuard requiredPermissions={ViewLicense}>
                    <LicenseDetail />             
                         </RoutePermissionGuard>
                }
              />
              <Route
                path="/applications"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewApplications}>
                    <BackOfficeApplications />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/applications/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewApplications}>
                    <ApplicationDetailPage />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/permissions/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={viewPermission}>
                    <DetailPermissions />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/permissions/new"
                element={
                  <RoutePermissionGuard requiredPermissions={viewPermission}>
                    <NewPermission />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/permissions"
                element={
                  <RoutePermissionGuard requiredPermissions={viewPermission}>
                    <PermissionLists />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/users"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewUser}>
                    <User />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/users/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewUser}>
                    <UserDetail />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/archives/archived-users"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewUser}>
                    <ArchivedUsers />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="archived-users/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewUser}>
                    <ArchivedUserDetail />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="/archives/archived-employees"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewEmployee}>
                    <ArchivedEmployees />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="archived-employees/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewEmployee}>
                    <ArchivedEmployeeDetails />
                  </RoutePermissionGuard>
                }
              />

              <Route
                path="/archives/archived-applications"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewApplications}>
                    <ArchivedApplication />
                  </RoutePermissionGuard>
                }
              />
              <Route
                path="archived-applications/detail/:id"
                element={
                  <RoutePermissionGuard requiredPermissions={ViewApplications}>
                    <ArchivedApplicationDetail />
                  </RoutePermissionGuard>
                }
              />
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
