import React from "react";
import { DashboardRoutes } from "./DashboardRoutes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { useSelector } from "react-redux";
export const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const { accessToken } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      const userToken = localStorage.getItem("saegel_token") || null;
      if (userToken) {
        setIsLoggedIn(true);
      }
    }
  }, [accessToken]);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />

          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path="/"
            component={DashboardRoutes}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
