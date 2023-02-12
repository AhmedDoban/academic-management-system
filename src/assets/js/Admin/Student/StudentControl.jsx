import React, { useState } from "react";
import CustomTable from "../components/CustomTable";
import CustomAdminInputsHead from "./../components/CustomAdminInputsHead";

function StudentControl() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <div className="StudentControl">
        <h1 className="main-titel-2">Student Page</h1>
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Student"
            searchName="Search For Student Name"
            linkTo="addNewStudent"
            Serach={Serach}
            SetSearch={SetSearch}
          />
          <div className="data">
            <CustomTable
              type="student"
              api="http://localhost:3000/students"
              col1="First Name"
              col2="Last Name"
              col3="Phone"
              col4="GPA"
              col5="gender"
              Serach={Serach}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentControl;
