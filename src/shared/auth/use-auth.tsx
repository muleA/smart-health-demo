import { useAppDispatch, useAppSelector } from "../../store/app-store-hook";
import { Session } from "../../models/session";
import { LoginRequest } from "../../models/login-request";
import { logIn, logOut, selectSession, selectIsLoading } from "../../store/auth-slice";

export const useAuth = (): {
  session: Session;
  submitLoginRequest: (request: LoginRequest) => any;
  logOut: () => void;
  selectIsLoading?: boolean;
} => {
  const session = useAppSelector(selectSession);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  return {
    session,
    submitLoginRequest: (request: LoginRequest) => {
      dispatch(logIn(request));
    },
    logOut: () => {
      dispatch(logOut());
    },
    selectIsLoading: isLoading,
  };
};
