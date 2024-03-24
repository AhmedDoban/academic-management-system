import React from "react";
import "./Students.css";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSelector } from "react-redux";
function Students() {
  const Students = useSelector((state) => state.User.user.Childrens);

  return (
    <React.Fragment>
      <div className="students">
        <div className="container">
          {Students.length > 0 ? (
            Students.map((Stu) => (
              <Link
                className="card"
                key={Stu._id}
                to={`${Stu._id}`}
                data-aos="zoom-in"
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../img/Players/ParentStudents.json")}
                    className="playerUSer"
                  />
                  <h5>{Stu.name}</h5>
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
