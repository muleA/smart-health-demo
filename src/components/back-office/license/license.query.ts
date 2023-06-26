import { apiSlice } from "../../../store/app.api";
import { licenseEndPoints } from "./license-endpoint";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLicense: builder.query<any, void>({
      query: () => ({
        url: licenseEndPoints.getLicenses,
        method: "GET",
      }),
      providesTags: ["license"],
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
    
    archiveLicense: builder.mutation<any, any>({
      query: (newRole) => ({
        url: licenseEndPoints.archiveLicense,
        method: "POST",
        data: newRole,
      }),
      invalidatesTags: ["license"],
    }),
    changeStatus: builder.mutation<any, any>({
      query: (newRole) => ({
        url: `${licenseEndPoints.changeLicenseStatus}/${newRole.userId}/${newRole.status}`,
        method: "POST",
        data: newRole,
      }),
      invalidatesTags: ["license"],
    }),
    restoreLicense: builder.mutation<any, any>({
      query: (newRole) => ({
        url: licenseEndPoints.restoreLicense,
        method: "POST",
        data: newRole,
      }),
      invalidatesTags: ["license"],
    }),
    createRole: builder.mutation<any, any>({
      query: (newRole) => ({
        url: licenseEndPoints.createLicense,
        method: "POST",
        data: newRole,
      }),
      invalidatesTags: ["Role"],
    }),
    getLicenseById: builder.query<any, string>({
      query: (roleId) => ({
        url: `${licenseEndPoints.getLicenseById}/${roleId}`,
        method: "GET",
      }),
      providesTags: ["license"],
    }),  
    
   
   
  }),
});

export const {
useGetLicenseQuery,
useGetRoleByRoleIdQuery,
useGetApplicationsQuery,
useGetLicenseByIdQuery,
useArchiveLicenseMutation,
useRestoreLicenseMutation,
useChangeStatusMutation

} = roleApi;
