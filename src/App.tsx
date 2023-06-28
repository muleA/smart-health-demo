import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./global.css";
import ErrorBoundary from "./shared/error-boundary";
import { Provider } from "react-redux";
import { store } from "./store/app.store";
import { useAuth } from "./shared/auth/use-auth";
import HomePage from "./pages/home";
import BackOfficeLayoutWrapper from "./components/back-office-layout";
import { Dashboard } from "./components/back-office/dashboard";
import PortalNavigation from "./components/portal/home-navbar";
import { I18nextProvider } from 'react-i18next';
import i18n from './shared/locals/i18n';
const App = () => {
  const { session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
console.log("session",session)
  useEffect(() => {
    if (session === null && location.pathname !== "/") {
      navigate("/");
    } else if (session && location.pathname === "/") {
      if (session?.userInfo?.accountType ==='user') {
        navigate("/home");

      } else {
        navigate("/home");
      }
    }
  }, [session, location.pathname, navigate]);
  return (
    <I18nextProvider i18n={i18n}>

    <ErrorBoundary>
      <Provider store={store}>

        <Routes>
          <Route path="/" element={<HomePage />} />
          {session !== null &&
            session?.userInfo?.accountType!=='user' && (
              <><Route
              path="*"
              element={<React.Fragment>
                <BackOfficeLayoutWrapper>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </BackOfficeLayoutWrapper>
              </React.Fragment>} /></>
            )}
          {session !== null &&
            session?.userInfo?.accountType ==='user' && (
              <Route
                path="*"
                element={
                  <React.Fragment>
                    <PortalNavigation />
                    <Routes>
                      <Route
                        path="/"
                        element={<HomePage />}
                      />
                    </Routes>
                  </React.Fragment>
                }
              />
            )}
        </Routes>
      </Provider>
    </ErrorBoundary>
    </I18nextProvider>
  );
};

export default App;
