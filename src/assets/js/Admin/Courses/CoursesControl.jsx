import React, { useState } from "react";
import CustomTable from "../components/CustomTable";
import CustomAdminInputsHead from "../components/Custom Admin Input Head/CustomAdminInputsHead";

function CoursesControl() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <div className="CoursesControl">
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
              api="https://camp-coding.tech/fci_project/graduation/admin/select_all_subject.php"
              type="courses"
              col1="Course Name"
              col2="Course Teacher"
              col3="Cource Level"
              Serach={Serach}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CoursesControl;
