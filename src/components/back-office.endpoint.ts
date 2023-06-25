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
  archiveUser: `${baseUrl}user/create-user`,
  getApplicationDetailByUserId: `${baseUrl}user/get-application-by-userId`,

};
