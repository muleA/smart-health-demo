/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth } from "./use-auth";

export default function checkTokenExpiration() {
  const { session, logOut } = useAuth();
  const accessToken = session?.accessToken; // Retrieve the access token from storage
  if (accessToken) {
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    if (session?.userInfo.exp && currentTime >= session?.userInfo.exp) {
      // Token has expired
      logOut();
    }
  }
}
