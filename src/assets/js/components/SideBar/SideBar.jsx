import React, { useState, useEffect, useRef, useCallback } from "react";
import "./sidebar.css";
import { NavLink, Link } from "react-router-dom";
import AuthUser from "../../../config/AuthUser";

const SideBar = ({ children }) => {
  const [active, setActive] = useState("fa-solid fa-bars");
  const sidebar = useRef(null);
  document.addEventListener("click", (e) => {
    if (e.target !== sidebar.current) {
      if (sidebar.current.classList.contains("open")) {
        sidebar.current.classList.toggle("open");
        setActive("fa-solid fa-bars");
      }
    }
  });

  const open = useCallback(
    (e) => {
      e.stopPropagation();
      sidebar.current.classList.toggle("open");
      sidebar.current.classList.contains("open")
        ? setActive("fa-solid fa-xmark")
        : setActive("fa-solid fa-bars");
    },
    [sidebar]
  );
  const { token, logOut } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logOut();
    }
  };
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
  }, [Theme, children]);
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
      <div className="sidebar" ref={sidebar}>
        <h3>academic management system </h3>
        <div className="bullet" onClick={open}>
          <i className={active}></i>
        </div>
        <ul className="p-sticky">
          <li className="options">
            <span>THEME</span>
            <label htmlFor="Theme">
              <input
                type="checkbox"
                name="Theme"
                id="Theme"
                onChange={HandleThemeChange}
                checked={Chek}
              />
              <span></span>
            </label>
          </li>

          <li>
            <NavLink to="home" onClick={open}>
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Class Room" onClick={open}>
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span>Class Room</span>
            </NavLink>
          </li>
          {children}
          <li>
            <NavLink to="library" onClick={open}>
              <i className="fa-solid fa-book"></i>
              <span>Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="setting" onClick={open}>
              <i className="fa-solid fa-gear fa-fw"></i>
              <span>Setting</span>
            </NavLink>
          </li>
          <li>
            <Link onClick={logoutUser} to="/">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>log-out </span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
