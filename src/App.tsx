import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./global.css";
import ErrorBoundary from "./shared/error-boundary";
import { Provider } from "react-redux";
import { store } from "./store/app.store";
import { useAuth } from "./shared/auth/use-auth";
import HomePage from "./pages/home";
import ApplicationList from "./portal/application-list";
import BackOfficeLayoutWrapper from "./components/layout";
import PortalNavigation from "./portal/home-navbar";
import { Dashboard } from "./components/back-office/dashboard";

const App = () => {
  const { session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (session === null && location.pathname !== "/") {
      navigate("/");
    } else if (session && location.pathname === "/") {
      if (session?.userInfo?.EmployeeRoles ===undefined) {
        navigate("/home");

      } else {
        navigate("/home");
      }
    }
  }, [session, location.pathname, navigate]);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {session !== null &&
            session?.userInfo?.EmployeeRoles!==undefined && (
              <Route
                path="*"
                element={
                  <React.Fragment>
                    <BackOfficeLayoutWrapper>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                      </Routes>
                    </BackOfficeLayoutWrapper>
                  </React.Fragment>
                }
              />
            )}
          {session !== null &&
            session?.userInfo?.EmployeeRoles ===undefined && (
              <Route
                path="*"
                element={
                  <React.Fragment>
                    <PortalNavigation />
                    <Routes>
                      <Route
                        path="/home"
                        element={<ApplicationList />}
                      />
                    </Routes>
                  </React.Fragment>
                }
              />
            )}
        </Routes>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
