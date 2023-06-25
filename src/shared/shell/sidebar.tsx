import React, { useEffect, useMemo, useState } from "react";
import { Drawer, List } from "antd";
import { filterMenusByPermissions, Menu } from "../../models/menu";
import { useAuth } from "../auth/use-auth";
import SidebarItem from "./sidebar-item";

export const drawerWidth = 300;

const Sidebar = (props:{menus:Menu[]}): JSX.Element => {
  const { session } = useAuth();

  const [visibleMenu, setVisibleMenu] = useState<Menu[]>([]);

  const permittedMenu = useMemo(() => {
    const userPermissions =
      session?.userInfo?.Roles?.flatMap((role: { Permissions: any; }) => role?.Permissions ?? []).map(
        (permission: { PermissionKey: any; }) => permission.PermissionKey,
      ) ?? [];

    return filterMenusByPermissions(props?.menus, userPermissions);
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
