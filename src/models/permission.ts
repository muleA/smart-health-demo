
export const SYSTEM_ROOT_PERMISSION = "yayasoles@gmail.com";

interface PermissionProps {
   Id: string;
   createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedAt: string;
    deletedBy: string;
    id: string;
    name: string;
    description: string;
    key: string;
    isActive: boolean;
    rolePermissions: string[]
}

export interface Permission extends PermissionProps {}
