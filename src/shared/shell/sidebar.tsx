import React, { useEffect, useMemo, useState } from "react";
import { Drawer, List } from "antd";
import { menus } from "./menu-list";
import { filterMenusByPermissions, Menu } from "../../models/menu";
import { useAuth } from "../auth/use-auth";
import SidebarItem from "./sidebar-item";
import Search from "antd/es/transfer/search";

export const drawerWidth = 300;

const Sidebar = (): JSX.Element => {
  const { session } = useAuth();

  const [visibleMenu, setVisibleMenu] = useState<Menu[]>([]);

  const permittedMenu = useMemo(() => {
    const userPermissions =
      session?.userInfo?.Roles?.flatMap((role: { Permissions: any; }) => role?.Permissions ?? []).map(
        (permission: { PermissionKey: any; }) => permission.PermissionKey,
      ) ?? [];

    return filterMenusByPermissions(menus, userPermissions);
  }, [session?.userInfo?.Roles]);

  useEffect(() => {
    setVisibleMenu(permittedMenu);
  }, [permittedMenu]);

  return (
    <List dataSource={visibleMenu} bordered={true}    
     className="mt-4"
    >
        {visibleMenu.map((menuItem, index) => (
          <SidebarItem  key={`${index}-${menuItem.name}`} menu={menuItem} mergedPath={""} />
        ))}
      </List>
 
  );
};

export default Sidebar;
