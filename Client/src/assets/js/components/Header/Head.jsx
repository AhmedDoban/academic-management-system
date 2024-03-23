import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./header.css";

function Head() {
  const [Theme, SetTheme] = useState(localStorage.getItem("theme") || "light");
  const [Chek, SetChek] = useState(false);
  const [MenuActive, SetMenuActive] = useState(false);

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
      Root.setProperty("--white-color", "#fff");
      Root.setProperty("--main-white-alt", "#eee");
      Root.setProperty("--main-text-color", "#000");
      Root.setProperty("--main-p-color", "#777");
      Root.setProperty("--main-overlay", "rgba(125, 125, 125, 0.7)");
    } else {
      Root.setProperty("--main-background-color", "#121212");
      Root.setProperty("--white-color", "#1e1e1e");
      Root.setProperty("--main-text-color", "#fff");
      Root.setProperty("--main-white-alt", "#303841");
      Root.setProperty("--main-p-color", "#eee");
      Root.setProperty("--main-overlay", "rgba(47, 47, 47, 0.7)");
    }
  };
  return (
    <div className="header-main">
      <div className="container">
        <h3>
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
          <span className="main-color mr-10">You are </span>
          <span className="red-color inlines">
            <Typewriter
              options={{
                strings: [" Stronger 💪", " Powerfull 🏋️‍♀️"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </h3>
        <i
          className="fa-solid fa-bars nav-mobile"
          onClick={() => SetMenuActive((prev) => !prev)}
        ></i>
        <ul className={MenuActive ? "navlinks active" : "navlinks"}>
          <li>
            <NavLink to="/">
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              <i className="fa-solid fa-right-to-bracket"></i>Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <i className="fa-solid fa-user-plus"></i>
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Head;
