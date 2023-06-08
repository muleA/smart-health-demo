import { apiSlice } from "../../../store/app.api";
import { permissionEndPoints } from "./permission-endpoint";

const permissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<any, void>({
      query: () => ({
        url: permissionEndPoints.getPermissions,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getPermissionByRoleId: builder.query<any, string>({
      query: (roleId) => ({
        url: `${permissionEndPoints.getPermissionById}/${roleId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }), 
    getPermissionById: builder.query<any, string>({
      query: (permId) => ({
        url: `${permissionEndPoints.getPermissionById}/${permId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedPermissions: builder.query<any, string>({
      query: () => ({
        url: permissionEndPoints.getArchivedPermission,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedPermissionByPermissionId: builder.query<any, string>({
      query: (permissionId) => ({
        url: `${permissionEndPoints.getArchivedPermissionById}/${permissionId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    createPermission: builder.mutation<any, any>({
      query: (newUser) => ({
        url: permissionEndPoints.createPermission,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archivePermission: builder.mutation<any, any>({
      query: (permissionId) => ({
        url: `${permissionEndPoints.archivePermission}/${permissionId}`,
        method: "POST",
        data: permissionId,
      }),
      invalidatesTags: ["user"],
    }),
    restorePermission: builder.mutation<any, any>({
      query: (permissionId) => ({
        url: `${permissionEndPoints.restorePermission}/${permissionId}`,
        method: "POST",
        data: permissionId,
      }),
      invalidatesTags: ["user"],
    }),  
    deletePermission: builder.mutation<any, any>({
      query: (permissionId) => ({
        url: `${permissionEndPoints.deletePermission}/${permissionId}`,
        method: "POST",
        data: permissionId,
      }),
      invalidatesTags: ["user"],
    }),
    updatePermission: builder.mutation<any, any>({
      query: (newUser) => ({
        url: permissionEndPoints.updatePermission,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetPermissionsQuery,useGetPermissionByIdQuery,useCreatePermissionMutation,useUpdatePermissionMutation,useDeletePermissionMutation,useGetPermissionByRoleIdQuery
} = permissionApi;
