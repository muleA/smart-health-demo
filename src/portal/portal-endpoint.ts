import { baseUrl } from "../shared/config";
export const authEndPoints = {
  createAccount: `${baseUrl}user/create-account`,
  apply: `${baseUrl}user/add-applicationToUser`,
  createUser: `${baseUrl}user/create-user`,
  getUsers: `${baseUrl}users`,
  getUserById: `${baseUrl}users/get-user/`,
  getAccounts: `${baseUrl}user/accounts`,
  addEducation: `${baseUrl}user/add-education-to-user`,
  deleteEducation: `${baseUrl}user/soft-delete-education/`,
  updateEducation: `${baseUrl}user/update-education`,
  restoreEducation: `${baseUrl}user/restore-education/`,
  getArchivedEducations: `${baseUrl}user/get-archived-educationsby-userId`,
  getEducationByUserId: `${baseUrl}user/get-education-by-userId/`,
  getArchivedExperience: `${baseUrl}user/get-archived-experience-by-userId`,
  getArchivedCertificates: `${baseUrl}user/get-archived-certificate-by-userId`,
  getArchivedApplications: `${baseUrl}user/get-archived-applications`,
  restoreCertificate: `${baseUrl}user/restore-certificate`,
  restoreExperience: `${baseUrl}user/restore-experience`,
  getApplicationDetail:`${baseUrl}user/get-application-detail`,
  restoreApplication: `${baseUrl}user/restore-application/`,
  archiveApplication: `${baseUrl}user/archive-application/`,
  archiveEducation: `${baseUrl}user/soft-delete-education/`,
archiveCertificate:`${baseUrl}user/soft-delete-certificate/`,
archiveExperience:`${baseUrl}user/soft-delete-experience/`,
getApplicationByStatus:`${baseUrl}user/get-application-by-status`

  
};
