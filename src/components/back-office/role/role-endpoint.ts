import { baseUrl } from "../../../configs/config";
export const roleEndPoints = {
  getRole: `${baseUrl}role/get-roles`,
  getRoleById: `${baseUrl}role/get-role-by-roleId`,
  getArchivedRole: `${baseUrl}role/get-archived-role`,
  getArchivedRoleById: `${baseUrl}role/get-archived-role-by-roleId`,
  createRole: `${baseUrl}role/create-role`,
  archiveRole: `${baseUrl}role/archive-role`,
  restoreRole: `${baseUrl}role/restore-role`,
  deleteRole: `${baseUrl}role/delete-role`,
  updateRole: `${baseUrl}role/update-role`, 
  addPermissionToRole: `${baseUrl}role/add-permission-to-role`,  
};
