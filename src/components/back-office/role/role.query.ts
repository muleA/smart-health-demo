import { apiSlice } from "../../../store/app.api";
import { roleEndPoints } from "./role-endpoint";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<any, void>({
      query: () => ({
        url: roleEndPoints.getRole,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getRoleByRoleId: builder.query<any, string>({
      query: (roleId) => ({
        url: `${roleEndPoints.getRoleById}/${roleId}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),  
    getArchivedRoles: builder.query<any, string>({
      query: () => ({
        url: roleEndPoints.getArchivedRole,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),  
    getArchivedRoleByRoleId: builder.query<any, string>({
      query: (roleId) => ({
        url: `${roleEndPoints.getArchivedRoleById}/${roleId}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),  
    createRole: builder.mutation<any, any>({
      query: (newRole) => ({
        url: roleEndPoints.createRole,
        method: "POST",
        data: newRole,
      }),
      invalidatesTags: ["Role"],
    }),
    archiveRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.archiveRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["Role"],
    }),
    restoreRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.restoreRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["Role"],
    }),  
    deleteRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.deleteRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation<any, any>({
      query: (newRole) => ({
        url: roleEndPoints.updateRole,
        method: "POST",
        data: newRole,
      }),
      invalidatesTags: ["Role"],
    }),
    addPermissionToRole: builder.mutation<any, any>({
      query: (roleId) => ({
        url: `${roleEndPoints.addPermissionToRole}/${roleId}`,
        method: "POST",
        data: roleId,
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleByRoleIdQuery,
  useGetArchivedRoleByRoleIdQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useCreateRoleMutation
} = roleApi;
