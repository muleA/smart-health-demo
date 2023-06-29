import { baseUrl } from "../configs/config";
import { ChangeLicenseStatus } from "../shared/shell/permissions-list";
export const backOfficeEndPoints = {
  createAccount: `${baseUrl}user/create-account`,
  getRoles:`${baseUrl}role/get-roles`,
  apply: `${baseUrl}user/add-applicationToUser`,
  createUser: `${baseUrl}user/create-user`,
  getUsers: `${baseUrl}user/get-users`,
  getUserById: `${baseUrl}user/get-user`,
  getAccounts: `${baseUrl}user/accounts`,
  getApplications: `${baseUrl}user/get-applications`,
  getLicenses: `${baseUrl}user/get-licenses`,
  archiveUser: `${baseUrl}user/archive-user`,
  getApplicationDetailByUserId: `${baseUrl}user/get-application-by-userId`,
getArchivedUser:`${baseUrl}user/get-archived-users`,
getArchivedApplication:`${baseUrl}user/get-archived-application`,
getArchivedEmployees:`${baseUrl}employees/get-archived-employees`,
ChangeLicenseStatus: `${baseUrl}user/change-application-status-By-applicationId`,

};
