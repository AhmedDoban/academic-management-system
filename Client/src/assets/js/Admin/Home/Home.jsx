import React, { useEffect } from "react";
import "./Home.css";
import Box from "../components/Home Box Admin/Box";
import Mountain from "../../components/Mountain Template/Mountain";
import { useDispatch, useSelector } from "react-redux";
import { GetAdminDashBoadrdData } from "../../../Toolkit/Slices/AdminSlice";

function AdminHome() {
  const Dispatch = useDispatch();
  const { Status } = useSelector((state) => state.Admin);

  useEffect(() => {
    Dispatch(GetAdminDashBoadrdData());
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Welcome</h1>
        </div>
      </Mountain>
      <div className="AdminHome">
        <div className="container">
          {/****************** Student Box **********************/}
          <Box
            link="/Students"
            data={Status.Students}
            title="Students"
            linkPlayer={require("../../../img/Players/Student.json")}
          />
          {/****************** Teachers Box **********************/}
          <Box
            link="/Instructors"
            data={Status.Instructor}
            title="Instructors"
            linkPlayer={require("../../../img/Players/Doctor.json")}
          />
          {/****************** Parents Box **********************/}
          <Box
            link="/Parents"
            data={Status.Parent}
            title="Parents"
            linkPlayer={require("../../../img/Players/Parent.json")}
          />
          {/****************** Admin Box **********************/}
          <Box
            link="/Admins"
            data={Status.Admin}
            title="Admins"
            linkPlayer={require("../../../img/Players/Admin.json")}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default AdminHome;
