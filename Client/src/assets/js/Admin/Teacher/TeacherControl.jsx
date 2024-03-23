import React, { useState } from "react";
import CustomAdminInputsHead from "../components/Custom Admin Input Head/CustomAdminInputsHead";
import CustomTable from "../components/CustomTable";

function TeacherControl() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <div className="TeacherControl">
        <div className="studentControl-container">
          <CustomAdminInputsHead
            Title="Teacher"
            linkTo="addNewTeacher"
            Serach={Serach}
            SetSearch={SetSearch}
          />
          <div className="data">
            <CustomTable
              type="teacher"
              api={`${process.env.REACT_APP_API}/admin/select_all_doctors.php`}
              col1="Name"
              col2="Code"
              col3="Pass"
              Serach={Serach}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default TeacherControl;
