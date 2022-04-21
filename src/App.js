import React from "react";
import { AppRouter } from "./routes/AppRouter";
import "./scss/style.scss";

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// );

const SaegelApp = () => {
  return <AppRouter />;
};

export default SaegelApp;
