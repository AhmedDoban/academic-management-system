import React, { useState } from "react";
import CustomAdminInputsHead from "./../components/CustomAdminInputsHead";
import CustomTable from "../components/CustomTable";

function TeacherControl() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <div className="TeacherControl">
        <h1 className="main-titel-2">Teacher Page</h1>
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Teacher"
            searchName="Search For Teacher Name"
            linkTo="addNewTeacher"
            Serach={Serach}
            SetSearch={SetSearch}
          />
          <div className="data">
            <CustomTable
              type="teacher"
              api="http://127.0.0.1:8000/api/get-all-doctors-with-relationships"
              col1="First Name"
              col2="Last Name"
              col3="Phone"
              col5="gender"
              Serach={Serach}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default TeacherControl;
