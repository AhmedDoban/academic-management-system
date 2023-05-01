import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFounded from "../components/Not Founded/NotFounded";
import Login from "./../components/Login/Login";
import Home from "./Home/Home";
import "./Gust.css";

function Gust(props) {
  const [Theme, SetTheme] = useState(localStorage.getItem("theme") || "light");
  const [Chek, SetChek] = useState(false);
  const toggleTheme = () => {
    Theme === "light" ? SetTheme("dark") : SetTheme("light");
  };
  const HandleThemeChange = () => {
    SetChek(!Chek);
    toggleTheme();
  };
  useEffect(() => {
    localStorage.setItem("theme", Theme);
    Theme === "light" ? SetChek(false) : SetChek(true);
    CheckCurrentTheme();
  }, [Theme]);

  const CheckCurrentTheme = () => {
    let Root = document.documentElement.style;
    if (Theme === "light") {
      Root.setProperty("--main-background-color", "#f1f5f9");
      Root.setProperty("--main-page-color", "#1b575b");
      Root.setProperty("--white-color", "#fff");
      Root.setProperty("--black-color", "#000");
      Root.setProperty("--main-p-color", "#777");
    } else {
      Root.setProperty("--main-background-color", "#121212");
      Root.setProperty("--main-page-color", "#121212  ");
      Root.setProperty("--white-color", "#1e1e1e");
      Root.setProperty("--black-color", "#fff");
      Root.setProperty("--main-p-color", "#fff");
    }
  };
  return (
    <React.Fragment>
      <label htmlFor="Theme" className="Theme">
        <input
          type="checkbox"
          name="Theme"
          id="Theme"
          onChange={HandleThemeChange}
          checked={Chek}
        />
        <span></span>
      </label>

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
