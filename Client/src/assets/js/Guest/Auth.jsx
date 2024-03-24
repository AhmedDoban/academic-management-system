import React from "react";
import Student from "../Student/student";
import Admin from "../Admin/Home/admin";
import Instructor from "../Instructor/Instructor";
import Parent from "../Parent/Parent";

function Auth(props) {
  if (JSON.parse(localStorage.getItem("TYPE")) === "Student") {
    return <Student SetLogedOn={props.SetLogedOn} />;
  } else if (JSON.parse(localStorage.getItem("TYPE")) === "Doctor") {
    return <Instructor SetLogedOn={props.SetLogedOn} />;
  } else if (JSON.parse(localStorage.getItem("TYPE")) === "Parent") {
    return <Parent SetLogedOn={props.SetLogedOn} />;
  }
}
export default Auth;
