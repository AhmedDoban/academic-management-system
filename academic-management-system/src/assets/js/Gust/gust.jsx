import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFounded from "../components/NotFounded";
import Register from "../components/Register";
import Login from "./../components/Login";
function Gust() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={<NotFounded to="/NotFounded" />} />
      </Routes>
    </React.Fragment>
  );
}
export default Gust;
