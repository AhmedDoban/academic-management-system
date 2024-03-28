import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Register.css";
import Blobs from "../../components/Blobs/Blobs";
import Select from "react-select";
import { UserRegister } from "../../../Toolkit/Slices/UserSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

function Register() {
  const Dispatch = useDispatch();
  const [PageHandle, SetPgaeHandle] = useState(1);
  const [MaxNumber, SetMaxNumber] = useState(0);

  const [User, Setuser] = useState({
    Mobile: "",
    email: "",
    name: "",
    national_ID: "",
    password: "",
    parent_national_ID: "",
  });

  const [Role, SetRole] = useState("");
  const [Type, SetType] = useState("");

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    Setuser({ ...User, [name]: value });
  };

  const HandleChangePhoneNumber = (e) => {
    Setuser({ ...User, Mobile: e });
  };

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
      url: `${process.env.REACT_APP_API}/Student/Register`,
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
      url: `${process.env.REACT_APP_API}/Instructor/Register`,
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
      url: `${process.env.REACT_APP_API}/Parent/Register`,
    },
  ];

  const HandleTypechange = (event) => {
    SetRole(event.url);
    SetType(event.value);
    if (event.value === "Student") SetMaxNumber(7);
    else SetMaxNumber(6);
  };

  const HandlePrev = () => {
    if (PageHandle <= 1) {
      SetPgaeHandle(1);
      return;
    }
    SetPgaeHandle(PageHandle - 1);
  };
  const HandleNext = () => {
    if (PageHandle >= MaxNumber) {
      SetPgaeHandle(MaxNumber);
      return;
    }
    SetPgaeHandle(PageHandle + 1);
  };

  return (
    <React.Fragment>
      <div className="Register">
        <Blobs />
        <div className="container center-flex gap-20" data-aos="zoom-in">
          <h1>Register</h1>
          <p className="txt-center">
            Welcome ! Register Now to get full access
          </p>
          <div className="center-flex gap-20 col-flex width-full ">
            <div className="content center-flex gap-20 col-flex width-full ">
              {PageHandle === 1 && (
                <div className="width-full">
                  <Select
                    options={options}
                    onChange={HandleTypechange}
                    menuPlacement="auto"
                  />
                </div>
              )}
              {PageHandle === 2 && (
                <div className="width-full">
                  <input
                    type="text"
                    name="name"
                    value={User.name}
                    placeholder={`Enter Your Full Name`}
                    onChange={(e) => HandleChangeInput(e)}
                  />
                </div>
              )}
              {PageHandle === 3 && (
                <div className="width-full">
                  <input
                    type="email"
                    name="email"
                    value={User.email}
                    placeholder={`Enter Your Email`}
                    onChange={(e) => HandleChangeInput(e)}
                  />
                </div>
              )}
              {PageHandle === 4 && (
                <div className="width-full">
                  <input
                    type="text"
                    name="national_ID"
                    value={User.national_ID}
                    placeholder={`Enter Your National ID`}
                    onChange={(e) => HandleChangeInput(e)}
                  />
                </div>
              )}
              {PageHandle === 5 && (
                <div className="width-full">
                  <input
                    type="password"
                    placeholder={`Enter Your Password `}
                    name="password"
                    value={User.password}
                    onChange={(e) => HandleChangeInput(e)}
                  />
                </div>
              )}
              {PageHandle === 6 && (
                <div className="mobile-input width-full">
                  <PhoneInput
                    value={`${User.Mobile}`}
                    onChange={(e) => HandleChangePhoneNumber(e)}
                    country={"eg"}
                  />
                </div>
              )}

              {Type === "Student" && PageHandle === 7 && (
                <div className="width-full">
                  <input
                    type="text"
                    placeholder={`Enter Your Parent National Id `}
                    name="parent_national_ID"
                    value={User.parent_national_ID}
                    onChange={(e) => HandleChangeInput(e)}
                  />
                </div>
              )}
            </div>
            <div className="HandleSubmitAction">
              <button
                onClick={() => HandlePrev()}
                className={PageHandle === 1 ? "active" : ""}
              >
                previous
              </button>
              <button
                onClick={() => HandleNext()}
                className={
                  (Type === "Student" && PageHandle === 7) ||
                  (Type !== "Student" && PageHandle === 6)
                    ? "active"
                    : ""
                }
              >
                Next
              </button>
            </div>

            <div className="main-btn-overlay">
              <button
                type="button"
                className="center-flex gap-20 main-btn width-full"
                onClick={() =>
                  Dispatch(UserRegister({ USER: User, URL: Role, Type: Type }))
                }
              >
                <i className="fas fa-arrow-right-to-bracket "></i> Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
