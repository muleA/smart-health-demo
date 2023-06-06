import { baseUrl } from "../../../shared/config";
export const permissionEndPoints = {
  getPermission: `${baseUrl}permission/get-permission`,
  getPermissionById: `${baseUrl}permission/get-permission-by-roleId`,
  getArchivedPermission: `${baseUrl}permission/get-archived-permission`,
  getArchivedPermissionById: `${baseUrl}permission/get-archived-permission-by-permissionId`,
  createPermission: `${baseUrl}permission/create-permission`,
  archivePermission: `${baseUrl}permission/archive-permission`,
  restorePermission: `${baseUrl}permission/restore-permission`,
  deletePermission: `${baseUrl}permission/delete-permission`,
  updatePermission: `${baseUrl}permission/update-role`,  
};
