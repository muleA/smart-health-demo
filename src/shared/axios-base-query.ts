import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getCurrentSession } from './current-session';

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      headers?: AxiosRequestConfig['headers'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    const session = getCurrentSession();
    try {
      const config: AxiosRequestConfig = {
        url: baseUrl + url,
        method: method,
        data: data,
        params: params,
      };
      /*  */
      if (session?.accessToken) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${session?.accessToken}`;
      }
      const result = await axios(config);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error:err,
      };
    }
  };
 