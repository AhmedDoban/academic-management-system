import React from "react";
import Student from "./../Student/student";
import Admin from "../Admin/Home/admin";
import Instructor from "./../Instructor/Instructor";

function Auth(props) {
  if (localStorage.getItem("Type") === "Student") {
    return <Student SetLogedOn={props.SetLogedOn} />;
  } else if (localStorage.getItem("Type") === "Doctor") {
    return <Instructor SetLogedOn={props.SetLogedOn} />;
  } else if (localStorage.getItem("Type") === "Parent") {
    return <p>parent</p>;
  }
}
export default Auth;
