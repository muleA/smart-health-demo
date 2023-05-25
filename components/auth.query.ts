import { apiSlice } from "../store/app.api";
import { authEndPoints } from "./auth-endpoint";
const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
     getUsers: build.query<any, any>({
      query: () => ({
        url: `${authEndPoints.getUsers}`,
        method: "GET",
      }),
      providesTags:["user"]
    }),
    getAccounts: build.query<any, any>({
      query: () => ({
        url: `${authEndPoints.getAccounts}`,
        headers: {
          "X-Domain": "System",
        },
        method: "GET",
     
      }),
      providesTags:["Account"]

    }), 

    createAccount: build.mutation<any, any>({
      query: (newUser) => {
        return {
          url: authEndPoints.createAccount,
          method: "POST",
          data: newUser,
        };
      },
      invalidatesTags:["Account"]
    }),
    createUser: build.mutation<any, any>({
        query: (newUser) => {
          return {
            url: authEndPoints.createUser,
            method: "POST",
            data: newUser,
          };
        },
        invalidatesTags:["user"]

      }),
  }),
  overrideExisting: true,
});

export const {useCreateAccountMutation,useCreateUserMutation,useGetAccountsQuery,useGetUsersQuery} = userApi;
