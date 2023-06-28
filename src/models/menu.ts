import { useAuth } from "../shared/auth/use-auth";
import { Permission, SYSTEM_ROOT_PERMISSION } from "./permission";

export type Menu = {
  name: string;
  icon?: any;
  path: string;
  permissions?: any[];
  child?: Menu[];
};

export function filterMenusByPermissions(menus: Menu[], permissionKeys: string[]): Menu[] {
  console.log("menus",menus)
  console.log("permissions",permissionKeys)
  return menus
    .filter((menu) => {
      // If the user has SYSTEM_ROOT permission, include the menu
      if (permissionKeys.includes(SYSTEM_ROOT_PERMISSION)) {
        return true;
      }
   
      // If the menu has permissions, check if the user has at least one of them
      if (menu.permissions) {
        return menu.permissions.every((permission) => permissionKeys.includes(permission));
      }
      // If the menu doesn't have any permissions, include it
      return true;
    })
    .map((menu) => {
      // If the menu has child menus, filter them recursively
      if (menu.child) {
        return { ...menu, child: filterMenusByPermissions(menu.child, permissionKeys) };
      }
      // If the menu doesn't have child menus, return it as is
      return menu;
    });
}
