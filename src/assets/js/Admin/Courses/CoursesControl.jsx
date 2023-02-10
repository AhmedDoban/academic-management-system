import React from "react";
import CustomTable from "./CustomTable";
import CustomAdminInputsHead from "./../components/CustomAdminInputsHead";

function CoursesControl() {
  return (
    <React.Fragment>
      <div className="CoursesControl">
        <h1 className="main-titel-2">Courses Page</h1>
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Course"
            searchName="Search For Course Name"
          />
          <div className="data">
            <CustomTable api="http://localhost:3000/CourcesDB" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CoursesControl;
