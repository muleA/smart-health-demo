import { baseUrl } from "../../../configs/config";

export const HomeEndPoints={
    getLicenses:`${baseUrl}user/get-licenses`,
    getLicenseByApplicationId:`${baseUrl}user/get-license-by-applicationId`,
    getApplicationByUserIdWithLicenseId:`${baseUrl}user/get-application-with-license-by-userId`
}