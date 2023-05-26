import React, { useState } from "react";
import CustomTable from "../components/CustomTable";
import CustomAdminInputsHead from "./../components/CustomAdminInputsHead";

function CoursesControl() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <div className="CoursesControl">
        <h1 className="main-titel-2">Courses Page</h1>
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Course"
            searchName="Search For Course Name"
            linkTo="addNewCourse"
            Serach={Serach}
            SetSearch={SetSearch}
          />
          <div className="data">
            <CustomTable
              api="http://localhost:3000/CourcesDB"
              type="courses"
              col1="Course Name"
              col2="Course Teacher"
              col3="Courses video len"
              Serach={Serach}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CoursesControl;
