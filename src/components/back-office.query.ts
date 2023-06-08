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
    getRoles: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getRoles,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getApplications: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getLicenses,
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

  })
});

export const {

  useGetUsersQuery,
  useRestoreEducationMutation,
   useRestoreApplicationMutation,
   useUpdatedUserMutation,
   useGetRolesQuery,
   useGetApplicationsQuery
} = backOfficeApi;
