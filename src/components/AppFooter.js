import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter className="bg-light">
      <div className="ms-auto">
        <p className="mx-auto text-dark">&copy; 2022 - Desarrollado por Signwall360</p>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
