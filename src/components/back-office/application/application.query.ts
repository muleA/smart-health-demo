import { apiSlice } from "../../../store/app.api";
import { applicationEndpoint } from "./application-endpoint";

const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<any, void>({
      query: () => ({
        url: applicationEndpoint.getApplications,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getSubmittedApplications:builder.query<any,void>({
      query: () => ({
        url: applicationEndpoint.getSubmitedApplications,
        method: "GET",
      }),
      providesTags: ["user"],
    })
  }),
});

export const {
useGetApplicationsQuery,
useGetSubmittedApplicationsQuery
} = applicationApi;
