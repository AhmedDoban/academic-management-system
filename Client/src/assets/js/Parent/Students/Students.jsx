import React, { useState } from "react";
import "./Students.css";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
function Students() {
  const [Students_Of_Parent, Set_Students_Of_Parent] = useState([]);

  return (
    <React.Fragment>
      <div className="students">
        <div className="container">
          {Students_Of_Parent.length > 0 ? (
            Students_Of_Parent.map((Stu) => (
              <Link
                className="card"
                key={Stu.parent_id}
                to={`${Stu.student_id}`}
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../img/Players/ParentStudents.json")}
                    className="playerUSer"
                  />
                  <h5>{Stu.student_name}</h5>
                </div>
              </Link>
            ))
          ) : (
            <div className="nostudent-container">
              <div className="container">
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../img/Players/ParentNoStudents.json")}
                  className="nostudent-player"
                ></Player>
                <p>There is No Students </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Students;
