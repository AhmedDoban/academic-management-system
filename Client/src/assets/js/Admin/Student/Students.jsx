import React, { useState } from "react";
import CustomTable from "./../components/Custom Table/CustomTable";
import CustomAdminInputsHead from "../components/Custom Admin Input Head/CustomAdminInputsHead";
import Mountain from "../../components/Mountain Template/Mountain";
import "./Student.css";
import { useEffect } from "react";
import { GetAdminDashBoadrdData } from "../../../Toolkit/Slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";

function StudentControl() {
  const [Serach, SetSearch] = useState("");

  const Dispatch = useDispatch();
  const { Students } = useSelector((state) => state.Admin);

  useEffect(() => {
    Dispatch(GetAdminDashBoadrdData());
    //eslint-disable-next-line
  }, []);

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
              linkTo="addNewStudent"
              Serach={Serach}
              SetSearch={SetSearch}
            />
            <div className="data">
              <CustomTable
                Serach={Serach}
                ViewData={Students}
                Type="Students"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentControl;
