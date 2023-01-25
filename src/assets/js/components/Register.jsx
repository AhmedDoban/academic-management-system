import React from "react";
import Blobs from "./Blobs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthUser from "../Gust/AuthUser";

function Register() {
  const navigate = useNavigate();

  const { http, setToken } = AuthUser();
  const [First_Name, setFirst_Name] = useState();
  const [Last_Name, SetLast_Name] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const HandleSubmit = (e) => {
    http
      .post("/register", {
        Email: Email,
        Password: Password,
        First_Name: First_Name,
        Last_Name: Last_Name,
      })
      .then((res) => {
        navigate("/login");
      });
  };
  return (
    <React.Fragment>
      <div className="Signin ">
        <Blobs />
        <div className="container center-flex gap-20 ">
          <h1>Register </h1>
          <p className="txt-center">Register Now to get full access</p>

          <div className="center-flex gap-20 col-flex width-full ">
            <div className="width-full">
              <input
                type="text"
                name="First_Name"
                id="First_Name"
                placeholder="Enter Your First Name"
                required
                onChange={(e) => setFirst_Name(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="width-full">
              <input
                type="text"
                name="Last_Name"
                id="Last_Name"
                placeholder="Enter Your Last Name"
                required
                onChange={(e) => SetLast_Name(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="width-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="width-full">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <button
              type="button"
              className="center-flex gap-20 main-btn width-full"
              onClick={HandleSubmit}
            >
              <i className="fas fa-arrow-right-to-bracket "></i> Continue
            </button>
          </div>

          <p>
            have an account
            <Link to="/login" replace>
              {" "}
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
