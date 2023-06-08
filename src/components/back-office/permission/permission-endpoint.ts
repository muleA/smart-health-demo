import { baseUrl } from "../../../configs/config";
export const permissionEndPoints = {
  getPermissions: `${baseUrl}permission/get-permissions`,
  getPermissionByRoleId: `${baseUrl}permission/get-permission-by-roleId`,
  getPermissionById: `${baseUrl}permission/get-permission-by-Id`,
  getArchivedPermission: `${baseUrl}permission/get-archived-permission`,
  getArchivedPermissionById: `${baseUrl}permission/get-archived-permission-by-permissionId`,
  createPermission: `${baseUrl}permission/create-permission`,
  archivePermission: `${baseUrl}permission/archive-permission`,
  restorePermission: `${baseUrl}permission/restore-permission`,
  deletePermission: `${baseUrl}permission/delete-permission`,
  updatePermission: `${baseUrl}permission/update-role`,  
};
