import { apiSlice } from "../../../store/app.api";
import { employeeEndPoints } from "./employee-endpoint";

const employeeId = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any, void>({
      query: () => ({
        url: employeeEndPoints.getEmployee,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getEmployeeByEmployeeId: builder.query<any, string>({
      query: (employeeId) => ({
        url: `${employeeEndPoints.getEmployeeById}/${employeeId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedEmployees: builder.query<any, string>({
      query: () => ({
        url: employeeEndPoints.getArchivedEmployee,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getArchivedEmployeeByEmployeeId: builder.query<any, string>({
      query: (employeeId) => ({
        url: `${employeeEndPoints.getArchivedEmployeeById}/${employeeId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    getRoleToEmployee: builder.query<any, string>({
      query: (employeeId) => ({
        url: `${employeeEndPoints.getRoleToEmployee}/${employeeId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),  
    createEmployee: builder.mutation<any, any>({
      query: (newUser) => ({
        url: employeeEndPoints.createEmployee,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveEmployee: builder.mutation<any, any>({
      query: (employeeId) => ({
        url: `${employeeEndPoints.archiveEmployee}/${employeeId}`,
        method: "POST",
        data: employeeId,
      }),
      invalidatesTags: ["user"],
    }),
    restoreEmployee: builder.mutation<any, any>({
      query: (employeeId) => ({
        url: `${employeeEndPoints.restoreEmployee}/${employeeId}`,
        method: "POST",
        data: employeeId,
      }),
      invalidatesTags: ["user"],
    }),  
    deleteEmployee: builder.mutation<any, any>({
      query: (employeeId) => ({
        url: `${employeeEndPoints.deleteEmployee}/${employeeId}`,
        method: "POST",
        data: employeeId,
      }),
      invalidatesTags: ["user"],
    }),
    updateEmployee: builder.mutation<any, any>({
      query: (newUser) => ({
        url: employeeEndPoints.updateEmployee,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    addRoleToEmployee: builder.mutation<any, any>({
      query: (employeeId) => ({
        url: `${employeeEndPoints.addRoleToEmployee}/${employeeId}`,
        method: "POST",
        data: employeeId,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation
} = employeeId;
