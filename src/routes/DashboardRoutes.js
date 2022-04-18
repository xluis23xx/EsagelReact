import React from "react";
import { Switch, Route } from "react-router-dom";

export const DashboardRoutes = () => {
  return (
    <>
      <div className=""></div>
      <Switch>
        <Route exact path="/" component={() => <h1>Perro marvel</h1>}></Route>
      </Switch>
    </>
  );
};
