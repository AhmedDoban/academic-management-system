import React from "react";
import Blobs from "./Blobs";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthUser from "./AuthUser";

function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const HandleSubmit = (e) => {
    http.post("/login", { email: email, password: password }).then((res) => {
      setToken(res.data.user, res.data.access_token);
    });
  };
  return (
    <React.Fragment>
      <div className="Signin ">
        <Blobs />
        <div className="container center-flex gap-20 ">
          <h1>Login</h1>
          <p className="txt-center">
            Welcome back ! login to get full access
            <span className="display-block ">
              did you
              <Link to=""> forget your password ?</Link>
            </span>
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

            <button
              type="button"
              className="center-flex gap-20 main-btn width-full"
              onClick={HandleSubmit}
            >
              <i className="fas fa-arrow-right-to-bracket "></i> Continue
            </button>
          </div>

          <p>
            don't have an account
            <Link to="/register" replace>
              {" "}
              Register now
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
