import React from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import DefaultLayout from "../layout/DefaultLayout";
import { AuthContext } from "../context/AuthContext";
import { NavContext } from "../context/navContext";
export const AppRouter = () => {
  // const [isLogged, setIsLogged] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [navProperties, setNavProperties] = React.useState({
    sidebarshow: false,
    unfoldable: false,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavContext.Provider value={{ navProperties, setNavProperties }}>
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
      </NavContext.Provider>
    </AuthContext.Provider>
  );
};
