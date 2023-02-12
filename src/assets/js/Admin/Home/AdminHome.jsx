import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import axios from "axios";

function AdminHome(props) {
  const [Student, setStudent] = useState([]);
  const [Teacher, setTeacher] = useState([]);
  const [Courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((reasponse) => setStudent(reasponse.data));
    axios
      .get("http://localhost:3000/CourcesDB")
      .then((reasponse) => setCourses(reasponse.data));
    axios
      .get("http://localhost:3000/teachers")
      .then((reasponse) => setTeacher(reasponse.data));
  }, []);

  return (
    <React.Fragment>
      <h1 className="main-titel-2">Admin Page</h1>
      <div className="AdminHome">
        {/****************** Student Box **********************/}
        <div className="box">
          <Link to="/student">
            <i className="fa-regular fa-user"></i>
            <p>
              <CountUp
                start={0}
                end={Student.length}
                duration={2}
                separator=" "
              />
            </p>
            <span>Number of Students</span>
          </Link>
        </div>
        {/****************** Teachers Box **********************/}
        <div className="box">
          <Link to="/teachers">
            <i className="fa-solid fa-chalkboard-user"></i>
            <p>
              <CountUp
                start={0}
                end={Teacher.length}
                duration={2}
                separator=" "
              />
            </p>
            <span>Number of Teachers</span>
          </Link>
        </div>
        {/****************** Courses Box **********************/}
        <div className="box">
          <Link to="/courses">
            <i className="fa-solid fa-graduation-cap fa-fw"></i>
            <p>
              <CountUp
                start={0}
                end={Courses.length}
                duration={2}
                separator=" "
              />
            </p>
            <span>Number of Courses</span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AdminHome;
