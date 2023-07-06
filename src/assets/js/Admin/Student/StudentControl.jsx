import React, { useState } from "react";
import CustomStudentTable from "../components/CustomTable";
import CustomAdminInputsHead from "../components/Custom Admin Input Head/CustomAdminInputsHead";

function StudentControl() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <div className="StudentControl">
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Student"
            searchName="Search For Student Name"
            linkTo="addNewStudent"
            Serach={Serach}
            SetSearch={SetSearch}
          />
          <div className="data">
            <CustomStudentTable
              type="student"
              api={`${process.env.REACT_APP_API}/admin/select_all_students.php`}
              col1="Name"
              col2="Student Code"
              col3="student Nat Id"
              api_Delete=""
              Serach={Serach}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentControl;
