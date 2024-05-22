import React, { useState } from "react";
import "./Home.css";
import Box from "../components/Home Box Admin/Box";
import Mountain from "../../components/Mountain Template/Mountain";

function AdminHome() {
  const [Student, setStudent] = useState([]);
  const [Teacher, setTeacher] = useState([]);
  const [Courses, setCourses] = useState([]);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Welcome</h1>
        </div>
      </Mountain>
      <div className="AdminHome">
        <div className="container">
          {/****************** Student Box **********************/}
          <Box
            link="/Students"
            data={Student.length}
            title="Students"
            linkPlayer={require("../../../img/Players/Student.json")}
          />
          {/****************** Teachers Box **********************/}
          <Box
            link="/Instructors"
            data={Teacher.length}
            title="Instructors"
            linkPlayer={require("../../../img/Players/Doctor.json")}
          />
          {/****************** Parents Box **********************/}
          <Box
            link="/Parents"
            data={Teacher.length}
            title="Parents"
            linkPlayer={require("../../../img/Players/Parent.json")}
          />
          {/****************** Admin Box **********************/}
          <Box
            link="/Admins"
            data={Teacher.length}
            title="Admins"
            linkPlayer={require("../../../img/Players/Admin.json")}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default AdminHome;
