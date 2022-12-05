import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./../components/AuthUser";

function Home() {
  const navigate = useNavigate();

  const { http } = AuthUser();
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    featchUserDetails();
  }, []);

  const featchUserDetails = () => {
    http.post("/me").then((res) => {
      setUserDetails(res.data);
    });
  };

  const [password, setPassword] = useState();
  const HandleSubmit = (e) => {
    if (password === userDetails.parent_password) {
      navigate("/home/parent");
    }
    if (password === userDetails.student_password) {
      navigate("/home/student");
    }
    console.log(password === userDetails.student_password);
  };

  return (
    <React.Fragment>
      <div className="landing home center-flex col-flex">
        <h1 className="p-relative color-green">
          <span className="color-orange">HI ! </span>
          sudent {userDetails.name} or parent
        </h1>
        <p className="d-block p-relative">Enter password to continue</p>

        <div className="p-relative center-flex col-flex gap-20 input-section">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="center-flex gap-20 width-full main-btn"
            onClick={HandleSubmit}
          >
            <i className="fas fa-arrow-right-to-bracket "></i> Continue
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
