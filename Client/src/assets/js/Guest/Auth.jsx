import React from "react";
import Student from "../Student/student";
import Admin from "../Admin/Home/admin";
import Instructor from "../Instructor/Instructor";
import Parent from "../Parent/Parent";

function Auth(props) {
  if (JSON.parse(localStorage.getItem("TYPE")) === "Student") {
    return <Student />;
  } else if (JSON.parse(localStorage.getItem("TYPE")) === "Instractor") {
    return <Instructor />;
  } else if (JSON.parse(localStorage.getItem("TYPE")) === "Parent") {
    return <Parent />;
  }
}
export default Auth;
