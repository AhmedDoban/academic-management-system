import React from "react";
import { Link, NavLink } from "react-router-dom";
// import AuthUser from "../../../config/AuthUser";
function SideBarAdminPage() {
  // const { token, logOut } = AuthUser();
  // const logoutUser = () => {
  //   if (token !== undefined) {
  //     logOut();
  //   }
  // };
  return (
    <React.Fragment>
      <div className="SideBarAdminPage">
        <h5>Admin Page</h5>
        <ul>
          <li>
            <NavLink to="/" end>
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student">
              <i className="fa-solid fa-users"></i>
              <span>Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/teachers">
              <i className="fa-solid fa-chalkboard-user"></i>
              <span>Teacher</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses">
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span>Courses</span>
            </NavLink>
          </li>
          <li>
            <Link to="/">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Log out</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
export default SideBarAdminPage;
