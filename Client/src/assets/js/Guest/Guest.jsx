import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFounded from "../components/Not Founded/NotFounded";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";

function Gust(props) {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={
            <Login
              SetLogedOn={props.SetLogedOn}
              options={props.options}
              SetType={props.SetType}
              Type={props.Type}
            />
          }
        />
        <Route path="*" element={<NotFounded to="/NotFounded" />} />
      </Routes>
    </React.Fragment>
  );
}
export default Gust;
