import React from "react";
import "./StudentTablePage.css";
import Mountain from "./../../components/Mountain Template/Mountain";
import { Route, Routes } from "react-router-dom";
import Semester from "./Semester/Semester";
import SemesterTable from "./Semester Table/SemesterTable";

function StudentTablePage(props) {
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Student table </h1>
        </div>
      </Mountain>
      <Routes>
        <Route path="" element={<Semester />} />
        <Route path="/:Semester_id" element={<SemesterTable />} />
      </Routes>
    </React.Fragment>
  );
}

export default StudentTablePage;
