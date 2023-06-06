import { baseUrl } from "../configs/config";
export const backOfficeEndPoints = {
  createAccount: `${baseUrl}user/create-account`,
  apply: `${baseUrl}user/add-applicationToUser`,
  createUser: `${baseUrl}user/create-user`,
  getUsers: `${baseUrl}users`,
  getUserById: `${baseUrl}users/get-user/`,
  getAccounts: `${baseUrl}user/accounts`,
};
