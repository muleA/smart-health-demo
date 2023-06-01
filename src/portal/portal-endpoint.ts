import {baseUrl} from '../shared/config'
export const authEndPoints={
   createAccount:`${baseUrl}user/create-account`,
   apply:`${baseUrl}user/add-applicationToUser`,
   createUser:`${baseUrl}user/create-user`,
   getUsers:`${baseUrl}users`,
   getUserById:`${baseUrl}users/get-user/`,
   getAccounts:`${baseUrl}user/accounts`,
   addEducation:`${baseUrl}user/add-education-to-user`,
   deleteEducation:`${baseUrl}user/soft-delete-education/`,
   updateEducation:`${baseUrl}user/update-education`,
   restoreEducation:`${baseUrl}user/restore-education/`,
   archiveEducation:`${baseUrl}user/archive-education/`,
   getArchivedEducations:`${baseUrl}user/get-archived-educationsby-userId/`,
   getEducationByUserId:`${baseUrl}user/get-education-by-userId/`

}