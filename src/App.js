import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
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
      label: (
        <div className="display-flex align-center gap-10">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets5.lottiefiles.com/packages/lf20_4vlxeulb.json"
            style={{ width: 40, height: 40 }}
          ></Player>
          <p className="color-black">Student </p>
        </div>
      ),
      url: `${process.env.REACT_APP_API}/student_login.php`,
    },
    {
      value: "Doctor",
      label: (
        <div className="display-flex align-center gap-10">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets3.lottiefiles.com/private_files/lf30_Zqz4rZ.json"
            style={{ width: 40, height: 40 }}
          ></Player>
          <p className="color-black">Doctor </p>
        </div>
      ),
      url: `${process.env.REACT_APP_API}/doctor/doctor_login.php`,
    },
    {
      value: "Parent",
      label: (
        <div className="display-flex align-center gap-10">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets10.lottiefiles.com/packages/lf20_uwh9uhdt.json"
            style={{ width: 40, height: 40 }}
          ></Player>
          <p className="color-black">Parent </p>
        </div>
      ),
      url: `${process.env.REACT_APP_API}/parent_login.php`,
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
