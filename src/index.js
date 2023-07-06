import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/style.css";
import "./assets/css/normalize.css";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import App from "./App";
import AOS from "aos";
import "aos/dist/aos.css";
import Admin from "./assets/js/Admin/Home/admin";
AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  </React.StrictMode>
);
