import React, { useState } from "react";
import Student from "./../Student/student";
import Admin from "../Admin/Home/admin";
import Instructor from "./../Instructor/Instructor";
import NotFounded from "./../components/Not Founded/NotFounded";

function Auth(props) {
  
  if (localStorage.getItem("Type") === "Student") {
    return <Student SetLogedOn={props.SetLogedOn} />;
  } else if (localStorage.getItem("Type") === "Doctor") {
    return <Instructor SetLogedOn={props.SetLogedOn} />;
  }
}
export default Auth;
