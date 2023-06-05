import { baseUrl } from "../../../shared/config";

export const UserEndPoints={
    getUser:`${baseUrl}users`,
    getModerators:`${baseUrl}moderators`,
    createUser:`${baseUrl}auth/signup`,
    getRoles:`${baseUrl}roles`
}