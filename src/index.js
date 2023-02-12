import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import App from "./App";
import Student from "./assets/js/Student/student";
import Admin from "./assets/js/Admin/Home/admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  </React.StrictMode>
);
