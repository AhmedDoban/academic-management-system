import React from "react";
import Mountain from "../../components/Mountain Template/Mountain";
import { Route, Routes } from "react-router-dom";
import Semester from "./Semester/Semester";
import SemesterSubjects from "./Semester Subjects/SemesterSubjects";

function ClassRoom(props) {
  return (
    <React.Fragment>
      <div className="ClassRoom">
        <Mountain>
          <div className="data">
            <h1> Class Room</h1>
          </div>
        </Mountain>
        {/************************************* start Cources ***************************************/}
        <Routes>
          <Route path="/" element={<Semester />} />
          <Route path=":Semester_id" element={<SemesterSubjects />} />
        </Routes>
        {/************************************* END Cources *****************************************/}
      </div>
    </React.Fragment>
  );
}
export default ClassRoom;
