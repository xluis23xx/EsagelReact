import React from "react";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";
import "./scss/style.scss";
import { store } from "./store/store";

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// );

const SaegelApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default SaegelApp;
