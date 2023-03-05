import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import axios from "axios";
import Box from "../components/Home Box Admin/Box";
import Weather from "./../components/Weather/Weather";

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
      <Weather />
      <div className="AdminHome">
        {/****************** Student Box **********************/}
        <Box
          link="/student"
          data={Student.length}
          Titel="Number of Students"
          className="fa-regular fa-user"
          otherStyle="blue-alt-back"
        />
        {/****************** Teachers Box **********************/}
        <Box
          link="/teachers"
          data={Teacher.length}
          Titel="Number of Teachers"
          className="fa-solid fa-chalkboard-user"
          otherStyle="orange-alt-back "
        />
        {/****************** Courses Box **********************/}
        <Box
          link="/courses"
          data={Courses.length}
          Titel="Number of Courses"
          className="fa-solid fa-graduation-cap fa-fw"
          otherStyle="green-alt-back"
        />
      </div>
    </React.Fragment>
  );
}
export default AdminHome;
