import { apiSlice } from "../store/app.api";
import { backOfficeEndPoints } from "./back-office.endpoint";

const backOfficeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getUsers,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query<any, any>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getUserById}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getRoles: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getRoles,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getArchivedUser: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getArchivedUser,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedApps: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getArchivedApplication,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedEmpoyee: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getArchivedEmployees,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getApplications: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getApplications,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getApplicationDetailByUserId: builder.query<any, void>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getApplicationDetailByUserId}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  
    restoreEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.createAccount}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),
    updatedUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.createUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),
    restoreApplication: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.archiveUser}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),

  })
});

export const {

  useGetUsersQuery,
  useRestoreEducationMutation,
   useRestoreApplicationMutation,
   useUpdatedUserMutation,
   useGetRolesQuery,
   useGetApplicationsQuery,
   useArchiveUserMutation,
   useGetApplicationDetailByUserIdQuery,
   useGetUserByIdQuery,useLazyGetUserByIdQuery,
   useGetArchivedAppsQuery,
   useGetArchivedEmpoyeeQuery,useGetArchivedUserQuery
} = backOfficeApi;
