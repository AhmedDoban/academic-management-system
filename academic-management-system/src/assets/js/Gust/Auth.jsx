import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/home";
import Parent from "../parent/parent";
import Student from "./../Student/student";
import NotFounded from "./../components/NotFounded";
function Auth() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/home/parent" element={<Parent />} />
        <Route exact path="/home/student" element={<Student />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFounded to="/NotFounded" />} />
      </Routes>
    </React.Fragment>
  );
}
export default Auth;
