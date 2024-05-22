import React, { useState } from "react";
import CustomTable from "../components/CustomTable";
import CustomAdminInputsHead from "../components/Custom Admin Input Head/CustomAdminInputsHead";
import Mountain from "../../components/Mountain Template/Mountain";
import "./Student.css";

function StudentControl() {
  const [Serach, SetSearch] = useState("");
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Studnets</h1>
        </div>
      </Mountain>
      <div className="Students">
        <div className="container">
          <div className="Students-container">
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
      </div>
    </React.Fragment>
  );
}
export default StudentControl;
