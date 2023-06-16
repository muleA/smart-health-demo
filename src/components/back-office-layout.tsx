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
import { ApplicationListPage } from "../pages/back-office/application/applications";
import { ArchivedUsers } from "./back-office/archives/user/archived-user";
import { ArchivedUserDetail } from "./back-office/archives/user/archived-user-detail";
import { ArchivedEmployees } from "./back-office/archives/employee/archived-employees";
import { ArchivedEmployeeDetails } from "./back-office/archives/employee/archived-employee-detail";
import { ArchivedLicense } from "./back-office/archives/license/archived-license";
import ArchivedLicenseDetail from "./back-office/archives/license/archived-license-detail.";
import { ArchivedApplication } from "./back-office/archives/application/archived-application";
import ArchivedApplicationDetail from "./back-office/archives/application/archived-application-detail";

const { Sider, Content, Header, Footer } = Layout;
const { SubMenu } = Menu;

const BackOfficeLayoutWrapper = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logOut } = useAuth();
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

  return (
    <div className="flex bg-gray-100 text-sm">
      <Sider
        width={250}
        className=" bg-gray-100"
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
      >
        <div className="flex flex-col  justify-center items-center py-4">
          <svg
            id="Group_77298"
            data-name="Group 77298"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="78.783"
            height="70"
            viewBox="0 0 78.783 70"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                y1="0.5"
                x2="1"
                y2="0.5"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0.117" stopColor="#2b388f" />
                <stop offset="1" stopColor="#00adee" />
              </linearGradient>
              <linearGradient
                id="linear-gradient-2"
                x1="0.5"
                y1="-1.667"
                x2="0.5"
                y2="12.907"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0.117" stop-color="#5dc9e5" />
                <stop offset="1" stop-color="#ca4a9a" />
              </linearGradient>
              <linearGradient
                id="linear-gradient-3"
                x1="0.5"
                y1="-1.667"
                x2="0.5"
                y2="12.91"
                xlinkHref="#linear-gradient-2"
              />
            </defs>
            <path
              id="Path_287005"
              data-name="Path 287005"
              d="M216.013,110.172h-19.39a3.073,3.073,0,0,0-3.2,2.925v21.69a15.129,15.129,0,0,0-.125,2.737v3.339a.912.912,0,0,0-.382.731,1.036,1.036,0,0,0,2.063,0,.892.892,0,0,0-.245-.608v-4.705h1.435v2.006a.911.911,0,0,0-.363.717,1.036,1.036,0,0,0,2.063,0,.9.9,0,0,0-.263-.627v-2.1h1.435v4.62a.9.9,0,0,0-.335.694,1.036,1.036,0,0,0,2.063,0,.894.894,0,0,0-.291-.655v-4.658h1.435v2.876a.924.924,0,0,0-.468.788,1.036,1.036,0,0,0,2.063,0,.883.883,0,0,0-.158-.5v-3.165h1.435v5.062a.9.9,0,0,0-.288.652,1.036,1.036,0,0,0,2.063,0,.9.9,0,0,0-.338-.7v-5.018h1.527a1.008,1.008,0,0,1-.091.076v3.293a.914.914,0,0,0-.408.749,1.036,1.036,0,0,0,2.063,0,.892.892,0,0,0-.217-.578v-2.3h-.048a14.278,14.278,0,0,0,.03-1.926V131.5a3.073,3.073,0,0,1,3.2-2.925l1.287,0a3.073,3.073,0,0,1,3.206,2.927l-.017,18.481c0,4.956-4.4,8.972-9.828,8.972h-9.166c-5.608,0-10.155-4.152-10.159-9.274l-.03-17.37h-.046V126.12a1.992,1.992,0,0,0-2.073-1.894,1.633,1.633,0,0,1-1.7-1.553V112.525a1.408,1.408,0,0,0,1.3-1.344,1.5,1.5,0,0,0-2.979,0,1.409,1.409,0,0,0,1.3,1.344v10.149a1.992,1.992,0,0,0,2.073,1.894,1.633,1.633,0,0,1,1.7,1.553v6.192h-3.534V126.12a1.992,1.992,0,0,0-2.073-1.894,1.633,1.633,0,0,1-1.7-1.553V112.525a1.408,1.408,0,0,0,1.3-1.344,1.5,1.5,0,0,0-2.979,0,1.409,1.409,0,0,0,1.3,1.344v10.149a1.992,1.992,0,0,0,2.073,1.894,1.633,1.633,0,0,1,1.7,1.553v6.192h-4.1V126.12a1.992,1.992,0,0,0-2.073-1.894,1.633,1.633,0,0,1-1.7-1.553V112.525a1.408,1.408,0,0,0,1.3-1.344,1.5,1.5,0,0,0-2.979,0,1.409,1.409,0,0,0,1.3,1.344v10.149a1.992,1.992,0,0,0,2.073,1.894,1.633,1.633,0,0,1,1.7,1.553v6.192h-3.4v-6.192a1.992,1.992,0,0,0-2.073-1.894,1.633,1.633,0,0,1-1.7-1.553V112.525a1.408,1.408,0,0,0,1.3-1.344,1.5,1.5,0,0,0-2.979,0,1.409,1.409,0,0,0,1.3,1.344v10.149a1.992,1.992,0,0,0,2.073,1.894,1.633,1.633,0,0,1,1.7,1.553v6.192h-3.4v-6.192a1.992,1.992,0,0,0-2.073-1.894,1.633,1.633,0,0,1-1.7-1.553V112.525a1.408,1.408,0,0,0,1.3-1.344,1.5,1.5,0,0,0-2.979,0,1.409,1.409,0,0,0,1.3,1.344v10.149a1.992,1.992,0,0,0,2.073,1.894,1.633,1.633,0,0,1,1.7,1.553v6.192h-3.4v-6.192a1.992,1.992,0,0,0-2.073-1.894,1.633,1.633,0,0,1-1.7-1.553V112.525a1.408,1.408,0,0,0,1.3-1.344,1.5,1.5,0,0,0-2.979,0,1.409,1.409,0,0,0,1.3,1.344v10.149a1.992,1.992,0,0,0,2.073,1.894,1.633,1.633,0,0,1,1.7,1.553V146.8h.01v6.182c0,11.195,9.933,20.27,22.186,20.27h31.071c8.936,0,16.181-6.619,16.181-14.784V129.244C236.886,118.711,227.541,110.172,216.013,110.172Zm-19.176,29.286a.456.456,0,1,1,.5-.454A.477.477,0,0,1,196.837,139.458Zm2.9,2.59a.456.456,0,1,1,.5-.454A.477.477,0,0,1,199.737,142.048Zm2.738-1.648a.456.456,0,1,1,.5-.454A.477.477,0,0,1,202.475,140.4Zm3.051,2.05a.456.456,0,1,1,.5-.454A.477.477,0,0,1,205.526,142.449Zm-11.579-.4a.456.456,0,1,1,.5-.454A.477.477,0,0,1,193.947,142.048Zm14.33-1.194a.456.456,0,1,1,.5-.454A.477.477,0,0,1,208.276,140.854ZM182.438,111.18a1.12,1.12,0,1,1,1.116,1.019A1.072,1.072,0,0,1,182.438,111.18Zm-3.907,0a1.12,1.12,0,1,1,1.116,1.019A1.072,1.072,0,0,1,178.53,111.18Zm-4.476,0a1.12,1.12,0,1,1,1.116,1.019A1.072,1.072,0,0,1,174.054,111.18Zm-3.772,0A1.12,1.12,0,1,1,171.4,112.2,1.072,1.072,0,0,1,170.282,111.18Zm-3.774,0a1.12,1.12,0,1,1,1.116,1.019A1.072,1.072,0,0,1,166.508,111.18Zm-3.772,0a1.12,1.12,0,1,1,1.116,1.019A1.072,1.072,0,0,1,162.736,111.18Z"
              transform="translate(-162.37 -103.255)"
              fill="url(#linear-gradient)"
            />
            <g
              id="Group_77297"
              data-name="Group 77297"
              transform="translate(61.569 0)"
            >
              <circle
                id="Ellipse_24799"
                data-name="Ellipse 24799"
                cx="3.907"
                cy="3.907"
                r="3.907"
                transform="translate(9.401)"
                fill="url(#linear-gradient-2)"
              />
              <circle
                id="Ellipse_24800"
                data-name="Ellipse 24800"
                cx="2.404"
                cy="2.404"
                r="2.404"
                transform="translate(12.406 11.972)"
                fill="url(#linear-gradient-3)"
              />
              <circle
                id="Ellipse_24801"
                data-name="Ellipse 24801"
                cx="2.404"
                cy="2.404"
                r="2.404"
                fill="url(#linear-gradient-3)"
              />
            </g>
          </svg>
        </div>
        <Sidebar />
      </Sider>

      <div className="flex-1 bg-white" style={{ minHeight: "100vh" }}>
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
            <div className="text-primary"> {session?.userInfo?.userName}</div>
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
              <Route path="/applications" element={<ApplicationListPage />} />
              <Route path="application/detail/:id" element={<ApplicationDetailPage />} />
              <Route
                path="permissions/detail/:id"
                element={<DetailPermissions />}
              />
              <Route path="permissions/new" element={<NewPermission />} />
              <Route path="/permissions" element={<PermissionLists />} />
              <Route path="/users" element={<User />} />
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
