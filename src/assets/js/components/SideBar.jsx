import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthUser from "../Gust/AuthUser";

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
  return (
    <React.Fragment>
      <div className="sidebar">
        <h3>academic management system </h3>
        <div className="bullet" onClick={open}>
          <i className={active}></i>
        </div>
        <ul className="p-sticky">
          <li>
            <NavLink to="home" onClick={open}>
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="setting" onClick={open}>
              <i className="fa-solid fa-gear fa-fw"></i>
              <span>Setting</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="projects" onClick={open}>
              <i className="fa-solid fa-diagram-project fa-fw"></i>
              <span>Project</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="courses" onClick={open}>
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span>courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Friends" onClick={open}>
              <i className="fa-regular fa-circle-user fa-fw"></i>
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
            <NavLink to="actvity-room" onClick={open}>
              <i className="fa-solid fa-broom"></i>
              <span>Activity Room</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="quiz" onClick={open}>
              <i className="fa-solid fa-feather"></i>
              <span>Quiz</span>
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
