import React, { useState, useEffect } from "react";
import Student from "./../Student/student";
import AuthUser from "../../config/AuthUser";
import Admin from "../Admin/Home/admin";
import Instructor from './../Instructor/Instructor';
import NotFounded from './../components/Not Founded/NotFounded';

function Auth() {
  const { http } = AuthUser();
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    featchUserDetails();
  }, []);

  const featchUserDetails = () => {
    http.post("/").then((res) => {
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
      return <Instructor />;
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
