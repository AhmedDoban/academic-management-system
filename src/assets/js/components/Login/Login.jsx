import React from "react";
import Blobs from "./../Blobs/Blobs";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthUser from "../../../config/AuthUser";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function Login() {
  const { setToken, postData, logOut } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = (e) => {
    postData(
      "https://academic-management-system.000webhostapp.com/api/admin/login",
      "Post",
      { email, password }
    ).then((data) => {
      if (JSON.parse(data).status === "false") {
        toast.error("Check entered data and Try again", {
          autoClose: 15000,
          theme: "colored",
        });
        logOut();
      } else setToken(JSON.parse(data).data, JSON.parse(data).token);
    });
  };

  return (
    <React.Fragment>
      <div className="Signin ">
        <Blobs />
        <div
          className="container center-flex gap-20 "
          data-aos="zoom-in"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          <h1>Login</h1>
          <p className="txt-center">
            Welcome back ! login to get full access
            <span className="display-block "></span>
          </p>
          <div className="center-flex gap-20 col-flex width-full ">
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

            <div className="main-btn-overlay">
              <button
                type="button"
                className="center-flex gap-20 main-btn width-full"
                onClick={HandleSubmit}
              >
                <i className="fas fa-arrow-right-to-bracket "></i> Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default Login;
