import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import Blobs from "../../components/Blobs/Blobs";
import Select from "react-select";
import { UserLogin } from "./../../../Toolkit/Slices/UserSlice";
import { Player } from "@lottiefiles/react-lottie-player";

function Login() {
  const [Password, SetPassword] = useState("");
  const [Nat_ID, SeNat_Id] = useState("");
  const [Url, SetUrl] = useState("");
  const [Type, SetType] = useState("");

  const Dispatch = useDispatch();

  const options = [
    {
      value: "Student",
      label: (
        <div className="display-flex align-center gap-10">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src={require("../../../img/Players/Student.json")}
            style={{ width: 40, height: 40 }}
          />
          <p className="color-black">Student </p>
        </div>
      ),
      url: `${process.env.REACT_APP_API}/Student/Login`,
    },
    {
      value: "Doctor",
      label: (
        <div className="display-flex align-center gap-10">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src={require("../../../img/Players/Doctor.json")}
            style={{ width: 40, height: 40 }}
          />
          <p className="color-black">Doctor </p>
        </div>
      ),
      url: `${process.env.REACT_APP_API}/Instractor/Login`,
    },
    {
      value: "Parent",
      label: (
        <div className="display-flex align-center gap-10">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src={require("../../../img/Players/Parent.json")}
            style={{ width: 40, height: 40 }}
          />
          <p className="color-black">Parent </p>
        </div>
      ),
      url: `${process.env.REACT_APP_API}/Parent/Login`,
    },
  ];

  const HandleTypechange = (event) => {
    SetUrl(event.url);
    SetType(event.value);
  };

  return (
    <React.Fragment>
      <div className="Signin ">
        <Blobs />
        <div className="container center-flex gap-20 " data-aos="zoom-in">
          <h1>Login</h1>
          <p className="txt-center">Welcome back ! login to get full access</p>
          <div className="center-flex gap-20 col-flex width-full ">
            <div className="width-full">
              <input
                type="text"
                value={Nat_ID}
                placeholder={`Enter Your National ID`}
                onChange={(e) => SeNat_Id(e.target.value)}
              />
            </div>

            <div className="width-full">
              <input
                type="password"
                placeholder={`Enter Your Password `}
                value={Password}
                onChange={(e) => SetPassword(e.target.value)}
              />
            </div>

            <div className="width-full">
              <Select options={options} onChange={HandleTypechange} />
            </div>

            <div className="main-btn-overlay">
              <button
                type="button"
                className="center-flex gap-20 main-btn width-full"
                onClick={() =>
                  Dispatch(
                    UserLogin({
                      password: Password,
                      URL: Url,
                      national_ID: Nat_ID,
                      Type: Type,
                    })
                  )
                }
              >
                <i className="fas fa-arrow-right-to-bracket "></i> Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
