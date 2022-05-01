import React from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import DefaultLayout from "../layout/DefaultLayout";
import { AuthContext } from "../context/AuthContext";
import firebase, { FirebaseContext } from "../firebase";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { deleteCookie, getCookie } from "../utils/cookies";
import { SettingsContext } from "../context/SettingsContext";
export const AppRouter = () => {
  const [user, setUser] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  React.useEffect(() => {
    const ESAGEL_TOKEN = getCookie("esagel_token");
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
      setUser(ESAGEL_PROFILE);
      setConfig(ESAGEL_CONFIG);
    } else {
      if (ESAGEL_TOKEN) {
        deleteCookie("esagel_token");
      }
      if (ESAGEL_PROFILE) {
        localStorage.removeItem("esagel_profile");
      }
      if (ESAGEL_CONFIG) {
        localStorage.removeItem("esagel_config");
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={{ firebase }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <SettingsContext.Provider value={{ config, setConfig }}>
            <Router>
              <Switch>
                <PublicRoute
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
