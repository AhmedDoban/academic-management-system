import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFounded from "../components/Not Founded/NotFounded";
import Login from "./../components/Login/Login";
import Home from "./Home/Home";

function Gust(props) {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={<Login SetLogedOn={props.SetLogedOn} />}
        />
        <Route path="*" element={<NotFounded to="/NotFounded" />} />
      </Routes>
    </React.Fragment>
  );
}
export default Gust;
