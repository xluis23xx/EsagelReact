import React from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import DefaultLayout from "../layout/DefaultLayout";
import { AuthContext } from "../context/AuthContext";
import firebase, { FirebaseContext } from "../firebase";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { deleteCookie, getCookie } from "../utils/cookies";
import { SettingsContext } from "../context/SettingsContext";
import { useAuth } from "../hooks/useAuth";
export const AppRouter = () => {
  const { updateToken, logoutUser } = useAuth();
  const [user, setUser] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [lastPath, setLastPath] = React.useState("/");
  React.useEffect(() => {
    const ESAGEL_TOKEN = getCookie("esagel_token");
    const ESAGEL_RFTOKEN = getCookie("esagel_refreshtoken");
    const ESAGEL_PROFILE = JSON.parse(
      localStorage.getItem("esagel_profile") || "{}"
    );
    const ESAGEL_CONFIG = JSON.parse(
      localStorage.getItem("esagel_config") || "{}"
    );
    if (
      ESAGEL_TOKEN &&
      Object.keys(ESAGEL_PROFILE).length > 0 &&
      Object.keys(ESAGEL_CONFIG).length > 0
    ) {
      if (ESAGEL_RFTOKEN) {
        updateToken();
      }
      setUser(ESAGEL_PROFILE);
      setConfig(ESAGEL_CONFIG);
    } else {
      logoutUser();
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      const ESAGEL_LAST_PATH = localStorage.getItem("esagel_lastpath");
      setLastPath(ESAGEL_LAST_PATH || "/");
    } else {
      setLastPath("/");
    }
  }, [user]);

  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={{ firebase }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <SettingsContext.Provider value={{ config, setConfig }}>
            <Router>
              <Switch>
                <PublicRoute
                  lastPath={lastPath}
                  path="/auth"
                  component={AuthRouter}
                  isAuthenticated={!user ? false : true}
                />
                <PrivateRoute
                  isAuthenticated={!user ? false : true}
                  path="/"
                  component={DefaultLayout}
                />
                <Redirect to="/auth/login" />
              </Switch>
            </Router>
          </SettingsContext.Provider>
        </AuthContext.Provider>
      </FirebaseContext.Provider>
    </Provider>
  );
};
