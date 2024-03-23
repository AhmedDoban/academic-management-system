import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./assets/Toolkit/Store";
import App from "./App";
import AOS from "aos";

import "./assets/css/style.css";
import "./assets/css/normalize.css";
import "./assets/css/framework.css";

import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.min.css";
import "aos/dist/aos.css";

AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={Store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
