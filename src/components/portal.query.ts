import { apiSlice } from "../store/app.api";
import { portalEndPoints } from "./portal-endpoint";

const portalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: portalEndPoints.getUsers,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedEducations: builder.query<any, string>({
      query: (userId) => ({
        url: `${portalEndPoints.getArchivedEducations}/${userId}`,
        method: "GET",
      }),
      providesTags: ["Education"],
    }),  
    getLicenseByStatus: builder.query<any, string>({
      query: (status) => ({
        url: `${portalEndPoints.getApplicationByStatus}/${status}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedCertificates: builder.query<any, string>({
      query: (userId) => ({
        url: `${portalEndPoints.getArchivedCertificates}/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),    
    getArchivedExperiences: builder.query<any, string>({
      query: (userId) => ({
        url: `${portalEndPoints.getArchivedExperience}/${userId}`,
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),      

    getAccounts: builder.query<any, void>({
      query: () => ({
        url: portalEndPoints.getAccounts,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getApplicationDetails: builder.query<any, any>({
      query: (id:any) => ({
        url: `${portalEndPoints.getApplicationDetail}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    
    getUserById: builder.query<any, any>({
      query: (id:any) => ({
        url: `${portalEndPoints.getUserById}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getArchivedApplications: builder.query<any, any>({
      query: () => ({
        url: `${portalEndPoints.getArchivedApplications}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    createAccount: builder.mutation<any, any>({
      query: (newUser) => ({
        url: portalEndPoints.createAccount,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    restoreEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.restoreEducation}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),
    updateProfile: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.updateUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),
    restoreApplication: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.restoreApplication}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),

    archiveApplication: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.archiveApplication}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.archiveEducation}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),archiveExperience: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.archiveExperience}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Experience"],
    }),
    archiveCertificate: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.archiveCertificate}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),

    restoreExperiance: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.restoreExperience}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Experience"],
    }),
    restoreCertificate: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.restoreCertificate}/${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    addEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: portalEndPoints.addEducation,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),
    applyToLicense: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.apply}/${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    createUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: portalEndPoints.createUser,
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
   useGetLicenseByStatusQuery,
   useUpdateProfileMutation,
   useGetUserByIdQuery
} = portalApi;
