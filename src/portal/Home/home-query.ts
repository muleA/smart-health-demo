import { apiSlice } from "../../store/app.api";
import { HomeEndPoints } from "./home-endpoint";

const HomeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLicenses: builder.query<any, void>({
      query: () => ({
        url: HomeEndPoints.getLicenses,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
 
   
  }),
});
export const {
useGetLicensesQuery
} = HomeApi;
