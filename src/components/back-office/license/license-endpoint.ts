import { baseUrl } from "../../../configs/config";
export const licenseEndPoints = {
  getLicense: `${baseUrl}user/get-license`,
  getLicenseById: `${baseUrl}license/get-license-by-licenseId`,
  getArchivedLicense: `${baseUrl}license/get-archived-license`,
  getArchivedLicenseById: `${baseUrl}license/get-archived-license-by-licenseId`,
  createLicense: `${baseUrl}license/create-license`,
  archiveLicense: `${baseUrl}license/archive-license`,
  restoreLicense: `${baseUrl}license/restore-license`,
  deleteLicense: `${baseUrl}license/delete-license`,
  updateLicense: `${baseUrl}license/update-license`, 
  addPermissionToLicense: `${baseUrl}license/add-permission-to-license`,  
};
