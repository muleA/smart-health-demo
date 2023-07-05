import { useAuth } from "../shared/auth/use-auth";
import { apiSlice } from "../store/app.api";
import { portalEndPoints } from "./portal-endpoint";
const portalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: portalEndPoints.getUser,
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
    getEducationById: builder.query<any, string>({
      query: (userId) => ({
        url: `${portalEndPoints.getEducationByUserId}/${userId}`,
        method: "GET",
      }),
      providesTags: ["Education"],
    }),  
    getLicenseByLicenseNumber: builder.query<any, string>({
      query: (userId) => ({
        url: `${portalEndPoints.getLicenseByLicenseNumber}/${userId}`,
        method: "GET",
      }),
      providesTags: ["license"],
    }),  
    
    getLicenseById: builder.query<any, string>({
      query: (userId) => ({
        url: `${portalEndPoints.getLicenseById}/${userId}`,
        method: "GET",
      }),
      providesTags: ["license"],
    }),
    getExperienceByUserId: builder.query<any, string>({
      query: (userId) => ({
        url: `${portalEndPoints.getEducationByUserId}/${userId}`,
        method: "GET",
      }),
      providesTags: ["Education"],
    }),  
    getLicenseByApplicationId: builder.query<any, string>({
      query: (applicationId) => ({
        url: `${portalEndPoints.getLicenseByApplicationId}/${applicationId}`,
        method: "GET",
      }),
      providesTags: ["license"],
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
    getApplicationUserId: builder.query<any, any>({
      query: (id:any) => ({
        url: `${portalEndPoints.getApplicationByUserId}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getLicenseByUserId: builder.query<any, any>({
      query: (id:any) => ({
        url: `${portalEndPoints.getLicenseByuserId}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getLicenseByUserIdAndStatus: builder.query<any, any>({
      query: (id:any) => ({
        url: `${portalEndPoints.getLicenseByuserIdAndStatus}/${id.userId}/${id?.status}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getEducationFileName: builder.query<any, any>({
      query: (option:any) => ({
        url: `${portalEndPoints.getEducationFileName}/${option.userId}/${option.educationId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getExperienceFileName: builder.query<any, any>({
      query: (option:any) => ({
        url: `${portalEndPoints.getExperienceFileName}/${option.userId}/${option.experienceId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getCertificateFileName: builder.query<any, { userId: string, certificateId: string }>({
      query: (option: { userId: string, certificateId: string }) => {
        console.log("Options:", option); // Added console.log statement
        return {
          url: `${portalEndPoints.getCertificateFileName}/${option.userId}/${option.certificateId}`,
          method: "GET",
        };
      },
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
      query: (id:string) => ({
        url: `${portalEndPoints.getArchivedApplicationsByUserId}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getEmployeeById:builder.query<any,any>({
      query:(id:string)=>({
        url:`${portalEndPoints.getEmployeeById}/${id}`,
        method:"GET"
      })
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
      extraOptions: {
        prefetch: false,
      },
      invalidatesTags: ["Education"],
    }),
    applyToLicense: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.apply}/${newUser.userId}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    deleteApplication: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${portalEndPoints.deleteApplication}/${newUser}`,
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
   useGetLicenseByApplicationIdQuery,
   useArchiveApplicationMutation,
   useRestoreApplicationMutation,
   useGetArchivedApplicationsQuery,
   useArchiveCertificateMutation,
   useArchiveEducationMutation,
   useArchiveExperienceMutation,
   useGetLicenseByStatusQuery,
   useUpdateProfileMutation,
   useGetUserByIdQuery,
   useGetEducationByIdQuery,
   useGetApplicationUserIdQuery,
   useLazyGetLicenseByIdQuery,
   useLazyGetLicenseByLicenseNumberQuery,
   useGetEducationFileNameQuery,
   useLazyGetEducationFileNameQuery,
   useLazyGetExperienceFileNameQuery,
   useLazyGetCertificateFileNameQuery,
   useGetLicenseByUserIdAndStatusQuery,
   useGetLicenseByUserIdQuery,
   useGetEmployeeByIdQuery,
   useDeleteApplicationMutation
} = portalApi;
