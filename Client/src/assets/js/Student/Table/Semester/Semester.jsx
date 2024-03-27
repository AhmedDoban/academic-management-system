import { Player } from "@lottiefiles/react-lottie-player";
import "./Semester.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetStudentSemesters } from "../../../../Toolkit/Slices/SemestersSlice";
function Semester() {
  const { Semesters } = useSelector((state) => state.Semester);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(GetStudentSemesters());
  }, []);

  return (
    <React.Fragment>
      <div className="SemesterTable">
        <div className="container">
          {Semesters.map((Semester) => (
            <Link
              className="card"
              key={Semester._id}
              to={`/Table/${Semester._id}`}
            >
              <div className="info">
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../img/Players/Table.json")}
                  className="PLayer"
                />

                <p>{Semester.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Semester;
