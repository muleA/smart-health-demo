import { axiosBaseQuery } from '../shared/auth/axios-base-query';
import { createApi } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['driver', 'Account', 'user','moderator'],
  endpoints: () => ({}),
});
