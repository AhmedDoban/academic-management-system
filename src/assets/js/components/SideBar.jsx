import React from "react";
import { NavLink, Link } from "react-router-dom";
import AuthUser from "./AuthUser";

const SideBar = (props) => {
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
        <ul className="p-sticky">
          <li>
            <NavLink to="home">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="setting">
              <i className="fa-solid fa-gear fa-fw"></i>
              <span>Setting</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="profile">
              <i className="fa-solid fa-user fa-fw"></i>
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="projects">
              <i className="fa-solid fa-diagram-project fa-fw"></i>
              <span>Project</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="courses">
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span>courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Friends">
              <i className="fa-regular fa-circle-user fa-fw"></i>
              <span>Friends</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Files">
              <i className="fa-regular fa-file fa-fw"></i>
              <span>Files</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="plans">
              <i className="fa-regular fa-credit-card fa-fw"></i>
              <span>plans</span>
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
