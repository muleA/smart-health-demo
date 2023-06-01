import { apiSlice } from "../store/app.api";
import { authEndPoints } from "./portal-endpoint";
const educationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArchivedEducations: builder.query<any, void>({
      query: () => ({
        url: authEndPoints.getArchivedEducations,
        method: "GET",
      }),
      providesTags: ["Education"],
    }),
    getEducationById: builder.query<any, void>({
      query: () => ({
        url: authEndPoints.getEducationByUserId,
        method: "GET",
      }),
      providesTags: ["Education"],
    }),
    addEducation: builder.mutation<any, any>({
      query: (newEducation) => ({
        url: authEndPoints.addEducation,
        method: "POST",
        data: newEducation,
      }),
      invalidatesTags: ["Education"],
    }),
    updateEducation: builder.mutation<any, any>({
      query: (newEducation) => ({
        url: authEndPoints.addEducation,
        method: "POST",
        data: newEducation,
      }),
      invalidatesTags: ["Education"],
    }),
    restoreEducation: builder.mutation<any, any>({
      query: (newEducation) => ({
        url: authEndPoints.restoreEducation,
        method: "POST",
        data: newEducation,
      }),
      invalidatesTags: ["Education"],
    }),
    archiveEducation: builder.mutation<any, any>({
      query: (newEducation) => ({
        url: authEndPoints.archiveEducation,
        method: "POST",
        data: newEducation,
      }),
      invalidatesTags: ["Education"],
    }),
  }),
});

export const {
  useAddEducationMutation,
  useUpdateEducationMutation,
  useArchiveEducationMutation,
  useRestoreEducationMutation,
  useGetArchivedEducationsQuery,
  useGetEducationByIdQuery,
  useLazyGetArchivedEducationsQuery,
  useLazyGetEducationByIdQuery,
} = educationApi;
