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
    getApplicationWithLicense:builder.query<any,any>({
      query:(id)=>({
        url:`${HomeEndPoints.getApplicationByUserIdWithLicenseId}/${id}`,
        method:'GET'
      }),
      providesTags: ["license_application"],
    })
   
  }),
});
export const {
useGetLicensesQuery,
useGetLicenseByApplicationIdQuery,
useLazyGetLicenseByApplicationIdQuery,
useLazyGetApplicationWithLicenseQuery,
} = HomeApi;
