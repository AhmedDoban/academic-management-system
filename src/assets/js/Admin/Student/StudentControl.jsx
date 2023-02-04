import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomAdminInputsHead from "./../components/CustomAdminInputsHead";
import CustomTable from "./../components/CustomTable";
import StudentDeatils from "./StudentDeatils";
import AddNewStudent from "./AddNewStudent";

function StudentControl() {
  return (
    <React.Fragment>
      <div className="StudentControl">
        <h1 className="main-titel-2">Student Page</h1>
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Student"
            searchName="Search For Student Name"
            linkTo="addNewStudent"
          />
          <div className="data">
            <CustomTable api="http://localhost:3000/students" type="student" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentControl;
