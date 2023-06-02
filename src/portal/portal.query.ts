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
    getAccounts: builder.query<any, void>({
      query: () => ({
        url: authEndPoints.getAccounts,
        headers: {
          "X-Domain": "System",
        },
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
  useAddEducationMutation
} = userApi;
