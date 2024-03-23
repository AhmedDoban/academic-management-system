import React, { useState } from "react";
import "./Login.css";
import Blobs from "./../Blobs/Blobs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

function Login(props) {
  const Navigate = useNavigate();
  const [Code, SetCode] = useState("");
  const [Nat_ID, SeNat_Id] = useState("");

  const HandleSubmit = async (e) => {
    await axios
      .post(
        props.Type.url,
        props.Type.value === "Student"
          ? { student_code: Code, student_nat_id: Nat_ID }
          : props.Type.value === "Doctor"
          ? { doctor_code: Code, doctor_pass: Nat_ID }
          : { parent_nat_id: Code, parent_pass: Nat_ID },
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
          localStorage.setItem("Type", props.Type.value);
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

  const HandleTypechange = (event) => {
    props.SetType(event);
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
                placeholder={`Enter Your ${
                  props.Type.value ? props.Type.value : ""
                } Code`}
                value={Code}
                onChange={(e) => SetCode(e.target.value)}
              />
            </div>
            <div className="width-full">
              <input
                type="text"
                value={Nat_ID}
                placeholder={`Enter Your ${
                  props.Type.value ? props.Type.value : ""
                } National ID`}
                onChange={(e) => SeNat_Id(e.target.value)}
              />
            </div>

            <div className="width-full">
              <Select options={props.options} onChange={HandleTypechange} />
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
