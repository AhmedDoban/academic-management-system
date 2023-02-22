import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthUser from "../../config/AuthUser";

const SideBar = (props) => {
  const [active, setActive] = useState("fa-solid fa-bars");
  const open = () => {
    const open = document.querySelector(".sidebar");
    open.classList.toggle("open");
    open.classList.contains("open")
      ? setActive("fa-solid fa-xmark")
      : setActive("fa-solid fa-bars");
  };
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
      <div className="sidebar">
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
            <NavLink to="courses" onClick={open}>
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span>courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="table" onClick={open}>
              <i className="fa-solid fa-calendar-days"></i>
              <span>Table</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="library" onClick={open}>
              <i className="fa-solid fa-book"></i>
              <span>Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="actvity-room" onClick={open}>
              <i className="fa-solid fa-broom"></i>
              <span>Activity Room</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="todo" onClick={open}>
              <i className="fa-solid fa-check"></i>
              <span>Todo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="notes" onClick={open}>
              <i className="fa-solid fa-note-sticky"></i>
              <span>Notes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="projects" onClick={open}>
              <i className="fa-solid fa-diagram-project fa-fw"></i>
              <span>Project</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="Friends" onClick={open}>
              <i className="fa-solid fa-users"></i>
              <span>Friends</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Files" onClick={open}>
              <i className="fa-solid fa-database"></i>
              <span>Files</span>
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
