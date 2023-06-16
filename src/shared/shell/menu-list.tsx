import * as Icon from "@ant-design/icons";
import { Menu } from "../../models/menu";
export const menus: Menu[] = [
    {
        name: "Home",
        path: "/home",
        icon: Icon.HomeOutlined,
    },
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: Icon.DashboardOutlined,
    },
    {
        name: "Roles",
        path: "/roles",
        icon: Icon.UsergroupAddOutlined,
    },
    {
      name: "Permissions",
      path: "/permissions",
      icon: Icon.KeyOutlined,
  },
    {
        name: "Users",
        path: "/users",
        icon: Icon.UserOutlined,
    },
    {
        name: "Employees",
        path: "/employees",
        icon: Icon.TeamOutlined,
    },
    {
        name: "Applications",
        path: "/applications",
        icon: Icon.AppstoreOutlined,
    },
    {
        name: "Licenses",
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
