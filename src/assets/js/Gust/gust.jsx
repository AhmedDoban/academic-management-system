import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFounded from "../components/NotFounded";
import Login from "./../components/Login/Login";
import Home from "./Home/Home";

function Gust() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<NotFounded to="/NotFounded" />} />
      </Routes>
    </React.Fragment>
  );
}
export default Gust;
