import { apiSlice } from "../../../store/app.api";
import { roleEndPoints } from "./role-endpoint";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<any, void>({
      query: () => ({
        url: roleEndPoints.getRole,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getRoleByRoleId: builder.query<any, string>({
      query: (roleId) => ({
        url: `${roleEndPoints.getRoleById}/${roleId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedRoles: builder.query<any, string>({
      query: () => ({
        url: roleEndPoints.getArchivedRole,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedRoleByRoleId: builder.query<any, string>({
      query: (roleId) => ({
        url: `${roleEndPoints.getArchivedRoleById}/${roleId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    createRole: builder.mutation<any, any>({
      query: (newUser) => ({
        url: roleEndPoints.createRole,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.archiveRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["user"],
    }),
    restoreRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.restoreRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["user"],
    }),  
    deleteRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.deleteRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["user"],
    }),
    updateRole: builder.mutation<any, any>({
      query: (newUser) => ({
        url: roleEndPoints.updateRole,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    addPermissionToRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.addPermissionToRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
} = roleApi;
