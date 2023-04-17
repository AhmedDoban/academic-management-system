import React, { useState, useEffect } from "react";
import "./assets/css/normalize.css";
import "./assets/css/framework.css";
import "./assets/css/style.css";
import Gust from "./assets/js/Gust/gust";
import Auth from "./assets/js/Gust/Auth";

function App() {
  const [LogedIn, SetLogedOn] = useState(false);

  const GetUser = (e) => {
    const userString = localStorage.getItem("Login");
    return userString;
  };
  useEffect(() => {
    SetLogedOn(GetUser());
  }, []);

  if (!LogedIn) {
    return <Gust SetLogedOn={SetLogedOn} />;
  } else {
    return <Auth />;
  }
}

export default App;
