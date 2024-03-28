import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "../components/Home Box Admin/Box";

function AdminHome() {
  const [Student, setStudent] = useState([]);
  const [Teacher, setTeacher] = useState([]);
  const [Courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/admin/select_all_students.php`)
      .then((reasponse) => setStudent(reasponse.data));
    axios
      .get(`${process.env.REACT_APP_API}/admin/select_all_subject.php`)
      .then((reasponse) => setCourses(reasponse.data));
    axios
      .get(`${process.env.REACT_APP_API}/admin/select_all_doctors.php`)
      .then((reasponse) => setTeacher(reasponse.data));
  }, []);

  return (
    <React.Fragment>
      <div className="AdminHome">
        {/****************** Student Box **********************/}
        <Box
          link="/student"
          data={Student.length}
          title="Students"
          linkPlayer="https://assets8.lottiefiles.com/packages/lf20_4vlxeulb.json"
        />
        {/****************** Teachers Box **********************/}
        <Box
          link="/teacher"
          data={Teacher.length}
          title="Instructors"
          linkPlayer="https://assets1.lottiefiles.com/packages/lf20_ikvz7qhc.json"
        />
        {/****************** Classes Box **********************/}
        <Box
          link="/Classes"
          data={Courses.length}
          title="Classes"
          linkPlayer="https://assets1.lottiefiles.com/packages/lf20_k0D4i8.json"
        />
      </div>
    </React.Fragment>
  );
}
export default AdminHome;
