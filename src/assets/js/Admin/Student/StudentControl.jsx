import React from "react";
import CustomAdminInputsHead from "./../components/CustomAdminInputsHead";
import StudentCustomTable from "./StudentCustomTable";

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
            <StudentCustomTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentControl;
