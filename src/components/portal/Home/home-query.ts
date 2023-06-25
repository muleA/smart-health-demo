import { apiSlice } from "../../../store/app.api";
import { HomeEndPoints } from "./home-endpoint";

const HomeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLicenses: builder.query<any, void>({
      query: () => ({
        url: HomeEndPoints.getLicenses,
        method: "GET",
      }),
      providesTags: ["license"],
    }),
    getLicenseByApplicationId: builder.query<any, void>({
      query: (id) => ({
        url: `${HomeEndPoints.getLicenseByApplicationId}/${id}`,
        method: "GET",
      }),
      providesTags: ["license"],
    }),
   
  }),
});
export const {
useGetLicensesQuery,useGetLicenseByApplicationIdQuery,useLazyGetLicenseByApplicationIdQuery
} = HomeApi;
