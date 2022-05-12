import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import routes from "../routes";

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes().map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.element}
                />
              )
            );
          })}
        </Switch>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
