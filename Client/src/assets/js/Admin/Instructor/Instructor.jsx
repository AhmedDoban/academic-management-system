import React, { useEffect, useState } from "react";
import CustomAdminInputsHead from "../components/Custom Admin Input Head/CustomAdminInputsHead";
import Mountain from "../../components/Mountain Template/Mountain";
import "./Instructor.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAdminDashBoadrdData } from "../../../Toolkit/Slices/AdminSlice";
import CustomTable from "./../components/Custom Table/CustomTable";

function Instructor() {
  const [Serach, SetSearch] = useState("");

  const Dispatch = useDispatch();
  const { Instructors } = useSelector((state) => state.Admin);

  useEffect(() => {
    Dispatch(GetAdminDashBoadrdData());
    //eslint-disable-next-line
  }, []);

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
              linkTo="AddNewInstructor"
              Serach={Serach}
              SetSearch={SetSearch}
            />
            <div className="data">
              <CustomTable
                ViewData={Instructors}
                Type="Instructors"
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
