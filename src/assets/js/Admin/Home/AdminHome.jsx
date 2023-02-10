import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

function AdminHome() {
  return (
    <React.Fragment>
      <h1 className="main-titel-2">Admin Page</h1>
      <div className="AdminHome">
        {/****************** Student Box **********************/}
        <div className="box">
          <Link to="/student">
            <i className="fa-regular fa-user"></i>
            <span>Students</span>
          </Link>
          <div className="box-footer">
            <span>Number of Students</span>
            <p>
              <CountUp start={0} end={160527.012} duration={2} separator=" " />
            </p>
          </div>
        </div>
        {/****************** Teachers Box **********************/}
        <div className="box">
          <Link to="/teachers">
            <i className="fa-solid fa-chalkboard-user"></i>
            <span>Teachers</span>
          </Link>
          <div className="box-footer">
            <span>Number of Teachers</span>
            <p>
              <CountUp start={0} end={160527.012} duration={2} separator=" " />
            </p>
          </div>
        </div>
        {/****************** Courses Box **********************/}
        <div className="box">
          <Link to="/courses">
            <i className="fa-solid fa-graduation-cap fa-fw"></i>
            <span>Courses</span>
          </Link>
          <div className="box-footer">
            <span>Number of Courses</span>
            <p>
              <CountUp start={0} end={160527.012} duration={2} separator=" " />
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AdminHome;
