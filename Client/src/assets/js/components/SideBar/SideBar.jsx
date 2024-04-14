import React, { useState, useEffect, useRef, useCallback } from "react";
import "./sidebar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";

const SideBar = ({ children }) => {
  const Navigate = useNavigate();
  const sidebar = useRef(null);
  const [active, setActive] = useState("fa-solid fa-bars");
  const [Theme, SetTheme] = useState(localStorage.getItem("theme") || "light");
  const [Chek, SetChek] = useState(false);
  const toggleTheme = () => {
    Theme === "light" ? SetTheme("dark") : SetTheme("light");
  };

  document.addEventListener("click", (e) => {
    if (sidebar.current !== null) {
      if (e.target !== sidebar.current) {
        if (sidebar.current.classList.contains("open")) {
          sidebar.current.classList.toggle("open");
          setActive("fa-solid fa-bars");
        }
      }
    }

    return () => {};
  });

  const open = useCallback(
    (e) => {
      e.stopPropagation();
      sidebar.current.classList.toggle("open");
      sidebar.current.classList.contains("open")
        ? setActive("fa-solid fa-xmark")
        : setActive("fa-solid fa-bars");
      return () => {};
    },
    [sidebar]
  );

  const logoutUser = () => {
    localStorage.clear();
    Navigate("/");
    window.location.reload(true);
    localStorage.setItem("theme", Theme);
  };

  const HandleThemeChange = () => {
    SetChek(!Chek);
    toggleTheme();
  };
  useEffect(() => {
    localStorage.setItem("theme", Theme);
    Theme === "light" ? SetChek(false) : SetChek(true);
    CheckCurrentTheme();
    //eslint-disable-next-line
  }, [Theme, children]);
  const CheckCurrentTheme = () => {
    let Root = document.documentElement.style;
    if (Theme === "light") {
      Root.setProperty("--main-background-color", "#f1f5f9");
      Root.setProperty("--footer-background-color", "#f5f9f7");
      Root.setProperty("--white-color", "#fff");
      Root.setProperty("--main-white-alt", "#eee");
      Root.setProperty("--main-text-color", "#000");
      Root.setProperty("--main-p-color", "#777");
      Root.setProperty("--main-overlay", "rgba(125, 125, 125, 0.7)");
      Root.setProperty("--box-shadow-color", "rgba(184, 184, 184, 0.19)");
    } else {
      Root.setProperty("--main-background-color", "#121212");
      Root.setProperty("--footer-background-color", "#111111");
      Root.setProperty("--white-color", "#1e1e1e");
      Root.setProperty("--main-text-color", "#fff");
      Root.setProperty("--main-white-alt", "#303841");
      Root.setProperty("--main-p-color", "#eee");
      Root.setProperty("--main-overlay", "rgba(47, 47, 47, 0.7)");
      Root.setProperty("--box-shadow-color", "rgba(10, 9, 19, 0.19)");
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
            <NavLink to="/" onClick={open}>
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
