import React, { useState, useEffect } from "react";
import Student from "./../Student/student";
import AuthUser from "../../config/AuthUser";
import Admin from "../Admin/Home/admin";
import Instructor from "./../Instructor/Instructor";
import NotFounded from "./../components/Not Founded/NotFounded";

function Auth() {
  const { user } = AuthUser();
  const [userDetails, setUserDetails] = useState([]);
  const [userEmail, SetuserEmail] = useState("");
  const student_reg = /^[\w-\.]+@student+\.+com/gi;
  const Teacher_reg = /^[\w-\.]+@doctor+\.+com/gi;
  const admin_reg = /^[\w-\.]+@admin+\.+com/gi;

  
  return <Student />;
  // useEffect(() => {
  //   featchUserDetails();
  // }, []);

  // const featchUserDetails = () => {
  //   setUserDetails(user);
  //   SetuserEmail(user.email);
  // };

  // if (userEmail.match(student_reg)) {
  //   return <Student userDetails={userDetails} />;
  // } else {
  //   if (userEmail.match(Teacher_reg)) {
  //     return <Instructor userDetails={userDetails} />;
  //   } else {
  //     if (userEmail.match(admin_reg)) {
  //       return <Admin userDetails={userDetails} />;
  //     } else {
  //       return <NotFounded />;
  //     }
  //   }
  // }
}
export default Auth;
