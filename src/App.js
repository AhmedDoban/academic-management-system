import React, { useContext } from "react";
import "./assets/css/normalize.css";
import "./assets/css/framework.css";
import "./assets/css/style.css";
import AuthUser from "./assets/js/components/AuthUser";
import Gust from "./assets/js/Gust/gust";
import Auth from "./assets/js/Gust/Auth";

function App() {
  const { GetToken } = AuthUser();
  if (!GetToken()) {
    return <Gust />;
  }
  return <Auth />;
}

export default App;
