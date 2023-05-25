import {baseUrl} from '../shared/config'
export const authEndPoints={
   createAccount:`${baseUrl}user/create-account`,
   createUser:`${baseUrl}user/create-user`,
   getUsers:`${baseUrl}users`,
   getUserById:`${baseUrl}users/get-user/`,
   getAccounts:`${baseUrl}user/accounts`
}