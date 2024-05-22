import React, { useState } from "react";
import CustomTable from "../components/CustomTable";
import CustomAdminInputsHead from "../components/Custom Admin Input Head/CustomAdminInputsHead";
import Mountain from "../../components/Mountain Template/Mountain";
import "./Instructor.css";

function Instructor() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Instructor</h1>
        </div>
      </Mountain>
      <div className="Instructors">
        <div className="container">
          <div className="Instructor-container">
            <CustomAdminInputsHead
              Title="Instructors"
              searchName="Search For Instructors Name"
              linkTo="AddNewInstructor"
              Serach={Serach}
              SetSearch={SetSearch}
            />
            <div className="data">
              <CustomTable
                type="Instructors"
                api={`${process.env.REACT_APP_API}/admin/select_all_Instructorss.php`}
                col1="Name"
                col2="Instructors Code"
                col3="Instructors Nat Id"
                api_Delete=""
                Serach={Serach}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Instructor;
