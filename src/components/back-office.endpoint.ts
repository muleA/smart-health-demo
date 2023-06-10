import { baseUrl } from "../configs/config";
export const backOfficeEndPoints = {
  createAccount: `${baseUrl}user/create-account`,
  getRoles:`${baseUrl}role/get-roles`,
  apply: `${baseUrl}user/add-applicationToUser`,
  createUser: `${baseUrl}user/create-user`,
  getUsers: `${baseUrl}user/get-users`,
  getUserById: `${baseUrl}user/get-user/`,
  getAccounts: `${baseUrl}user/accounts`,
  getApplications: `${baseUrl}user/accounts`,
  getLicenses: `${baseUrl}user/get-licenses`,
};
