import React, { useState } from "react";
import "./Login.css";
import Blobs from "./../Blobs/Blobs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
function Login(props) {
  const [student_code, setStudent_code] = useState("");
  const [student_nat_id, setStudent_nat_id] = useState("");
  const Navigate = useNavigate();

  const HandleSubmit = async (e) => {
    await axios
      .post(
        "http://camp-coding.tech/fci_project/graduation/student_login.php",
        { student_code, student_nat_id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "text/plain",
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("User", JSON.stringify(res.data.message));
          localStorage.setItem("Login", "ture");
          props.SetLogedOn(true);
          Navigate("/home");
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
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
                type="text"
                placeholder="Enter Your Student Code"
                value={student_code}
                onChange={(e) => setStudent_code(e.target.value)}
              />
            </div>
            <div className="width-full">
              <input
                type="text"
                value={student_nat_id}
                placeholder="Enter Your Student National ID"
                onChange={(e) => setStudent_nat_id(e.target.value)}
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
