import { Permission } from "./permission";

interface RoleProps {
  id: string;
  key: string;
  name: string;
  description:string;
  isDefault:boolean
}

export interface Role extends RoleProps {
  Permissions?: Permission[];
}
