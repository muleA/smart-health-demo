import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app.api';
import { authReducer } from "./auth-slice";
import { GlobalErrorReducer } from '../shared/utilities/error-dialogue/error-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    globalError: GlobalErrorReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiSlice,
      },
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
