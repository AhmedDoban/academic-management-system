import React from "react";
import Student from "../Student/student";
import Admin from "../Admin/Admin";
import Instructor from "../Instructor/Instructor";
import Parent from "../Parent/Parent";

function Auth(props) {
  if (JSON.parse(localStorage.getItem("TYPE")) === "Student") {
    return <Student />;
  } else if (JSON.parse(localStorage.getItem("TYPE")) === "Instructor") {
    return <Instructor />;
  } else if (JSON.parse(localStorage.getItem("TYPE")) === "Parent") {
    return <Parent />;
  } else if (JSON.parse(localStorage.getItem("TYPE")) === "Admin") {
    return <Admin />;
  }
}
export default Auth;
