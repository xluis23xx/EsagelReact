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
export const AppRouter = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const ESAGEL_TOKEN = getCookie("esagel_token");
    const ESAGEL_PROFILE = JSON.parse(
      localStorage.getItem("esagel_profile") || "{}"
    );
    if (ESAGEL_TOKEN && Object.keys(ESAGEL_PROFILE).length > 0) {
      setUser(ESAGEL_PROFILE);
    } else {
      if (ESAGEL_PROFILE) {
        deleteCookie("esagel_token");
      }
      if (ESAGEL_PROFILE) {
        localStorage.removeItem("esagel_profile");
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <FirebaseContext.Provider
        value={{
          firebase,
        }}
      >
        <AuthContext.Provider value={{ user, setUser }}>
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
        </AuthContext.Provider>
      </FirebaseContext.Provider>
    </Provider>
  );
};
