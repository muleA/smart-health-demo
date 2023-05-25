import type { AppProps } from 'next/app'
import  '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../store/app.store'
import { useAuth } from '../shared/auth/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../store/app.api';

function MyApp({ Component, pageProps }: AppProps) {
  /* const router=useRouter();
  useEffect(() => {
    if (session === null) {
      router.push("/");
    } else if (session && location.pathname === "/login") {
      router.push("/home");
    }
  }, [router, session]); */
  return(<>
      <Provider store={store}>
      <ApiProvider api={apiSlice}>
      <Component {...pageProps} />
      </ApiProvider>
      </Provider>

  
  </>) 
}

export default MyApp
