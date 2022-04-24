import React from "react";
import { useLocation } from "react-router-dom";

import routes from "../routes";

import { CBreadcrumb } from "@coreui/react";
import { Link } from "react-router-dom";

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const cleanLocation = currentLocation.replace(/\/[a-z0-9A-Z]{10,}/, "");

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => {
      let cleanpath = route.path;
      cleanpath = route.path.replace("/:id", "");
      return cleanpath === pathname;
    });
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];

    location.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(cleanLocation);

  return (
    <CBreadcrumb className="m-0 ms-2">
      <Link className="breadcrumb-item" to="/home">
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <Link
            key={index}
            className={`breadcrumb-item text-decoration-none ${
              breadcrumb.active ? "active" : ""
            }`}
            to={breadcrumb.pathname}
          >
            {breadcrumb.name}
          </Link>
        );
      })}
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
