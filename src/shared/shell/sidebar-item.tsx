import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "../../models/menu";
import { Menu as AntdMenu } from "antd";

const { SubMenu } = AntdMenu;

export interface SidebarItemProps {
  menu: Menu;
  mergedPath: string;
  padding?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  menu,
  mergedPath,
  padding,
}: SidebarItemProps) => {
  const location = useLocation();
  const [open, setOpen] = useState(location.pathname.includes(menu.path));
  const { icon: Icon } = menu;

  const handleOpenChange = (keys: string[]) => {
    setOpen(keys.includes(menu.path));
  };

  const renderSubMenu = (child: Menu[]) => {
    return child.map((ch: Menu, index: number) => (
      <SidebarItem
        key={`${index}-${ch.name}`}
        menu={ch}
        mergedPath={`${mergedPath}${menu.path}`}
        padding={padding ? padding + 4 : 4}
      />
    ));
  };

  return (
    <AntdMenu
      mode="inline"
      defaultOpenKeys={open ? [menu.path] : []}
      onOpenChange={handleOpenChange}
      selectedKeys={[location.pathname]}
    >
      {menu.child && (
        <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon style={{ marginRight: "5px",marginTop:"0px" }} />
              {menu.name}
            </span>
          }
        >
          {renderSubMenu(menu.child)}
        </SubMenu>
      )}
      {!menu.child && (
        <AntdMenu.Item key={`${mergedPath}${menu.path}`} className={`${location.pathname.startsWith(`${mergedPath}${menu.path}`) && `${mergedPath}${menu.path}` !== "/" ? "active-menu" : ""}`}>
          <Link to={`${mergedPath}${menu.path}`}>
            <Icon style={{ marginRight: "5px" }} />
            {menu.name}
          </Link>
        </AntdMenu.Item>
      )}
    </AntdMenu>
  );
};

export default SidebarItem;
