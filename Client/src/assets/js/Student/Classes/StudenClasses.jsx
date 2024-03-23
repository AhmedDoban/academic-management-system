import React from "react";
import Mountain from "./../../components/Mountain Template/Mountain";
import Courses from "./Classes";
import "./Classes.css";

function StudenClasses(props) {
  return (
    <React.Fragment>
      <div className="courses">
        <Mountain>
          <div className="data">
            <h1> Class Room</h1>
          </div>
        </Mountain>
        {/************************************* start Cources ***************************************/}
        <Courses />
        {/************************************* END Cources *****************************************/}
      </div>
    </React.Fragment>
  );
}
export default StudenClasses;
