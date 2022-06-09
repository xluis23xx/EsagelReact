import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";

export const PublicRoute = ({
  lastPath = "/",
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <>
            <DefaultLayout {...props}></DefaultLayout>
            <Redirect to={lastPath} />
          </>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
