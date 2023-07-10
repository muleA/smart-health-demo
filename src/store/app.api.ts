import { axiosBaseQuery } from '../shared/axios-base-query';
import { createApi } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Education', 'Certificate', 'Task','user','Experience','license','Role','Permission'],
  endpoints: () => ({}),
});
