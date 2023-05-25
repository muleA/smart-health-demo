import { useAppDispatch, useAppSelector } from "../../store/app-store-hook";
import { Session } from "../../models/session";
import { LoginRequest } from "../../models/login-request";
import { logIn, logOut, selectSession } from "../../store/auth-slice";

export const useAuth = (): {
  session: Session;
  submitLoginRequest: (request: LoginRequest) => void;
  logOut: () => void;
} => {
  const session = useAppSelector(selectSession);
    console.log("session at auth",session)
  const dispatch = useAppDispatch();
  return {
    session,
    submitLoginRequest: (request: LoginRequest) => {
      void dispatch(logIn(request));
    }, 
    logOut: () => {
      dispatch(logOut());
    },
  };
};
