import React from "react";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  return (
    <React.Fragment>
      <div class="sidebar">
        <h3>academic management system </h3>
        <ul>
          <li>
            <Link to="home/student">
              <i class="fa-regular fa-chart-bar fa-fw"></i>
              <span>Dashbord</span>
            </Link>
          </li>
          <li>
            <Link to="setting">
              <i class="fa-solid fa-gear fa-fw"></i>
              <span>Setting</span>
            </Link>
          </li>
          <li>
            <Link to="profile">
              <i class="fa-solid fa-user fa-fw"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="projects">
              <i class="fa-solid fa-diagram-project fa-fw"></i>
              <span>Project</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <i class="fa-solid fa-graduation-cap fa-fw"></i>
              <span>courses</span>
            </Link>
          </li>
          <li>
            <Link to="Friends">
              <i class="fa-regular fa-circle-user fa-fw"></i>
              <span>Friends</span>
            </Link>
          </li>
          <li>
            <Link to="Files">
              <i class="fa-regular fa-file fa-fw"></i>
              <span>Files</span>
            </Link>
          </li>
          <li>
            <Link to="plans">
              <i class="fa-regular fa-credit-card fa-fw"></i>
              <span>plans</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideBar;



