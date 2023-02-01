import React from "react";
import CustomAdminInputsHead from "./../components/CustomAdminInputsHead";
import CustomTable from "./../components/CustomTable";

function TeacherControl() {
  return (
    <React.Fragment>
      <div className="TeacherControl">
        <h1 className="main-titel-2">Teacher Page</h1>
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Teacher"
            searchName="Search For Teacher Name"
          />
          <div className="data">
            <CustomTable api="http://localhost:3000/teachers" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default TeacherControl;
