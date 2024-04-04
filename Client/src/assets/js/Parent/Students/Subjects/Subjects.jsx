import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Subjects.css";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";
function StudentData(props) {
  const params = useParams();
  const [select_solved, Set_select_solved] = useState([]);
  const [loading, Setloading] = useState(false);

  return (
    <React.Fragment>
      <div className="studentData">
        {loading ? (
          <LodingFeachData />
        ) : select_solved.length > 0 ? (
          <div className="container">
            {select_solved.map((Subjects) => (
              <Link
                className="card"
                data-aos="zoom-in"
                key={Subjects.generation_id}
                to={`${Subjects.generation_id}`}
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../../img/Players/NoStudentSubjects.json")}
                    className="PLayer"
                  />
                  <p>{Subjects.generation_name}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="nostudent-container">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets7.lottiefiles.com/packages/lf20_jG18nt.json"
              className="nostudent-player"
            />
            <p>Your Son haven't any Subjects</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default StudentData;
