import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from 'jsonwebtoken';
import { RootState } from "./app.store";
import { LoginRequest } from "../models/login-request";
import { Session } from "../models/session";
import { getCurrentSession } from "../shared/auth/current-session";
import { baseUrl } from "../shared/config";

// Define a type for the slice state
interface AuthState {
  session: Session | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  session: getCurrentSession(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      console.log("payload", action.payload);
      localStorage.setItem("session", JSON.stringify(action.payload));
      state.session = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("session");
      state.session = null;
    },
  },
});

export function logIn(request: LoginRequest) {
  return async function logInThunk(dispatch: any, getState: any) {
    try {
      console.log("get state", getState);
      const response = await axios.post(`${baseUrl}auth/login`, request);
      const decodedToken = jwt.decode(response.data.access_token);
      console.log("decoded token", decodedToken);
      if (decodedToken) {
        dispatch(setSession(decodedToken as Session));
      }
    } catch (error: any) {
      // Handle error
    }
  };
}

export const { setSession, logOut } = authSlice.actions;

// Selector to retrieve the session from the state
export const selectSession = (state: RootState) => state?.auth?.session ?? null;

export const authReducer = authSlice.reducer;
