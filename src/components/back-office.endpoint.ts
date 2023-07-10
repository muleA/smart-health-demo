import { baseUrl } from "../configs/config";
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
  restoreUser: `${baseUrl}user/restore-user/`,
deleteEmployee: `${baseUrl}user/delete-employee/`,
  restoreEmployee: `${baseUrl}user/restore-employee/`,
  archiveEmployee: `${baseUrl}employees/archive-employee`,
getApplicationDetailByUserId: `${baseUrl}user/get-application-by-userId`,
getArchivedUser:`${baseUrl}user/get-archived-users`,
getArchivedUserById:`${baseUrl}user/get-archived-users-by-Id/`,
getArchivedApplication:`${baseUrl}user/get-archived-application`,
getArchivedEmployees:`${baseUrl}employees/get-archived-employeesById`,
getArchivedEmployeeById:`${baseUrl}employees/get-archived-employeesById`,
ChangeLicenseStatus: `${baseUrl}user/change-application-status-By-applicationId`,
getTasks:`${baseUrl}task/get-tasks`,
createTask:`${baseUrl}/task/create-task`

};
