import React, { useState, useEffect } from "react";

import Student from "./../Student/student";
import AuthUser from "./AuthUser";

import NotFounded from "./../components/NotFounded";
import Admin from "./../Admin/admin";
import Teacher from "../Teacher/teacher";

function Auth() {
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

  const student_reg = /^[\w-\.]+@student+\.+com/gi;
  const Teacher_reg = /^[\w-\.]+@teacher+\.+com/gi;
  const admin_reg = /^[\w-\.]+@admin+\.+com/gi;

  if (userDetails.email.match(student_reg)) {
    return <Student />;
  } else {
    if (userDetails.email.match(Teacher_reg)) {
      return <Teacher />;
    } else {
      if (userDetails.email.match(admin_reg)) {
        return <Admin />;
      } else {
        return <NotFounded />;
      }
    }
  }
}
export default Auth;
