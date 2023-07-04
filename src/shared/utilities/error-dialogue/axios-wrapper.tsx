import axios from "axios";
import { useEffect } from "react";
import { store } from "../../../store/app.store";
import { getCurrentSession } from "../../current-session";
import { setError } from "./error-slice";
export const axiosClient = axios.create();
/* component props */
type AxiosWrapperProps = {
  children: React.ReactNode;
};
export const AxiosWrapper = (props: AxiosWrapperProps) => {
  const ses=getCurrentSession();
  console.log("sess",ses)
  /* useEffect hooks */
  useEffect(() => {
    if (store) {
      axiosClient.interceptors.request.use(
        function (config:any) {
          const session: any = getCurrentSession() || null;
          config.params.accessToken = session?.accessToken;
          return config;
        },
        async function (error: any) {
          return await Promise.reject(error);
        },
      );

      axios.interceptors.response.use(
        function (response) {
          return response;
        },
        async function (error) {
          store.dispatch(
            setError({
              message: error.message,
              code: error.message,
              response: error.response,
            }),
          );
          return await Promise.reject(error);
        },
      );
    }
  }, [{ store }]);

  return <>{props?.children}</>;
};
