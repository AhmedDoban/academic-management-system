import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFounded from "../components/NotFounded";
import StudentHomePage from "../Student/Home/StudentHomePage";
import Login from "./../components/Login/Login";

function Gust() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<StudentHomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<NotFounded to="/NotFounded" />} />
      </Routes>
    </React.Fragment>
  );
}
export default Gust;
