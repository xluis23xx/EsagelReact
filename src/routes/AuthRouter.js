import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginScreen from "../views/pages/login/Login";
import RegisterScreen from "../views/pages/register/Register";

// Containers
// const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// // Pages
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginScreen} />
      {/* <Route exact path="/auth/register" component={RegisterScreen} /> */}
      <Redirect to="/auth/login" />
    </Switch>
  );
};
