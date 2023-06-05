import { apiSlice } from "../store/app.api";
import { authEndPoints } from "./portal-endpoint";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: authEndPoints.getUsers,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedEducations: builder.query<any, string>({
      query: (userId) => ({
        url: `${authEndPoints.getArchivedEducations}/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getLicenseByStatus: builder.query<any, string>({
      query: (status) => ({
        url: `${authEndPoints.getApplicationByStatus}/${status}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedCertificates: builder.query<any, string>({
      query: (userId) => ({
        url: `${authEndPoints.getArchivedCertificates}/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),    
    getArchivedExperiences: builder.query<any, string>({
      query: (userId) => ({
        url: `${authEndPoints.getArchivedExperience}/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),      

    getAccounts: builder.query<any, void>({
      query: () => ({
        url: authEndPoints.getAccounts,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getApplicationDetails: builder.query<any, any>({
      query: (id:any) => ({
        url: `${authEndPoints.getApplicationDetail}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedApplications: builder.query<any, any>({
      query: () => ({
        url: `${authEndPoints.getArchivedApplications}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    createAccount: builder.mutation<any, any>({
      query: (newUser) => ({
        url: authEndPoints.createAccount,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    restoreEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.restoreEducation}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    restoreApplication: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.restoreApplication}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),

    archiveApplication: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.archiveApplication}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.archiveEducation}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),archiveExperience: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.archiveExperience}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveCertificate: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.archiveCertificate}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),

    restoreExperiance: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.restoreExperience}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    restoreCertificate: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${authEndPoints.restoreCertificate}/${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    addEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: authEndPoints.addEducation,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    applyToLicense: builder.mutation<any, any>({
      query: (newUser) => ({
        url: authEndPoints.apply,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    createUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: authEndPoints.createUser,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useCreateUserMutation,
  useGetAccountsQuery,
  useGetUsersQuery,
  useApplyToLicenseMutation,
  useAddEducationMutation,
  useGetArchivedEducationsQuery,
  useGetArchivedCertificatesQuery,
  useGetArchivedExperiencesQuery,
  useRestoreCertificateMutation,
  useRestoreEducationMutation,
   useRestoreExperianceMutation,
   useLazyGetApplicationDetailsQuery,
   useGetApplicationDetailsQuery,
   useArchiveApplicationMutation,
   useRestoreApplicationMutation,
   useGetArchivedApplicationsQuery,
   useArchiveCertificateMutation,
   useArchiveEducationMutation,
   useArchiveExperienceMutation,
   useGetLicenseByStatusQuery
} = userApi;
