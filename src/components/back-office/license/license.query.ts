import { apiSlice } from "../../../store/app.api";
import { licenseEndPoints } from "./license-endpoint";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLicense: builder.query<any, void>({
      query: () => ({
        url: licenseEndPoints.getLicenses,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getApplications: builder.query<any, void>({
      query: () => ({
        url: licenseEndPoints.getLicense,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getRoleByRoleId: builder.query<any, string>({
      query: (roleId) => ({
        url: `${licenseEndPoints.getLicense}/${roleId}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),  
    
    
    createRole: builder.mutation<any, any>({
      query: (newRole) => ({
        url: licenseEndPoints.createLicense,
        method: "POST",
        data: newRole,
      }),
      invalidatesTags: ["Role"],
    }),
 
   
   
  }),
});

export const {
useGetLicenseQuery,
useGetRoleByRoleIdQuery,
useGetApplicationsQuery

} = roleApi;
