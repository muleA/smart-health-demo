import { apiSlice } from "../../../store/app.api";
import { UserEndPoints } from "./user-endpoint";
const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<any, any>({
      query: () => ({
        url: `${UserEndPoints.getUser}`,
        method: "GET",
      }),
    }),
    getModerators: build.query<any, any>({
      query: () => ({
        url: `${UserEndPoints.getModerators}`,
        method: "GET",
      }),
    }),
    getRoles: build.query<any, any>({
      query: () => ({
        url: `${UserEndPoints.getRoles}`,
        headers: {
          "X-Domain": "System",
        },
        method: "GET",
     
      }),
    }),

    addNewUser: build.mutation<any, any>({
      query: (newUser) => {
        return {
          url: UserEndPoints.createUser,
          method: "POST",
          data: newUser,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetUsersQuery, useAddNewUserMutation,useGetRolesQuery,useGetModeratorsQuery } = userApi;
