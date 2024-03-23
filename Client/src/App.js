import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "./assets/css/normalize.css";
import "./assets/css/framework.css";
import "./assets/css/style.css";
import Guest from "./assets/js/Guest/Guest";
import Auth from "./assets/js/Guest/Auth";
import Student from "./assets/js/Student/student";

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
            src={require("./assets/img/Players/Student.json")}
            style={{ width: 40, height: 40 }}
          />
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
            src={require("./assets/img/Players/Doctor.json")}
            style={{ width: 40, height: 40 }}
          />
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
            src={require("./assets/img/Players/Parent.json")}
            style={{ width: 40, height: 40 }}
          />
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
      <Student
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
