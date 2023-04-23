import React, { useState, useEffect } from "react";
import "./assets/css/normalize.css";
import "./assets/css/framework.css";
import "./assets/css/style.css";
import Gust from "./assets/js/Gust/gust";
import Auth from "./assets/js/Gust/Auth";

function App() {
  const [LogedIn, SetLogedOn] = useState(false);
  const [Type, SetType] = useState("");

  const options = [
    {
      value: "Student",
      label: "Student",
      url: "http://camp-coding.tech/fci_project/graduation/student_login.php",
    },
    {
      value: "Doctor",
      label: "Doctor",
      url: "https://camp-coding.tech/fci_project/graduation/doctor/doctor_login.php",
    },
  ];

  const GetUser = (e) => {
    const userString = localStorage.getItem("Login");
    return userString;
  };

  useEffect(() => {
    SetLogedOn(GetUser());
  }, []);

  if (!LogedIn) {
    return (
      <Gust
        SetLogedOn={SetLogedOn}
        options={options}
        SetType={SetType}
        Type={Type}
      />
    );
  } else {
    return <Auth SetLogedOn={SetLogedOn} />;
  }
}

export default App;
