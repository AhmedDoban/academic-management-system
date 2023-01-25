import React, { useState, useEffect } from "react";

import Parent from "../parent/parent";
import Student from "./../Student/student";
import AuthUser from "./AuthUser";

import NotFounded from "./../components/NotFounded";
import Admin from "./../Admin/admin";

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
  const parent_reg = /^[\w-\.]+@parent+\.+com/gi;
  const admin_reg = /^[\w-\.]+@admin+\.+com/gi;

  if (userDetails.email.match(student_reg)) {
    return <Student />;
  } else {
    if (userDetails.email.match(parent_reg)) {
      return <Parent />;
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
