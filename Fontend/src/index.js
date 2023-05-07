import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "./redux/slices/userSlice";

store.dispatch(getUserData());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
        closeOnClick
          pauseOnHover={false}
          theme="dark"
        />

        <App />
      </Provider>
    </Router>
  </>
);
