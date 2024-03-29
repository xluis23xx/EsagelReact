import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter
      // className="bg-black"
      style={{ backgroundColor: "rgba(42,42,42,255)" }}
    >
      <div className="ms-auto">
        <p className="mx-auto text-light">
          &copy; {new Date().getFullYear()} - ESAGEL
        </p>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
