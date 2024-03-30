import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Exams.css";
function Exam() {
  const params = useParams();
  const [Exams, SetExams] = useState([]);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>EXAMS</h1>
        </div>
      </Mountain>
      <div className="exams">
        {Exams.length > 0 ? (
          <div className="container">
            {Exams.map((Exam) => (
              <Link
                className="exam-card"
                key={Exam.exam_id}
                to={`${Exam.exam_id}`}
                data-aos="zoom-in"
              >
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../img/Players/ExamPlayer.json")}
                  className="ExamPlayer"
                />
                <p className="examName">{Exam.exam_name}</p>
                <p>
                  Start Time : <span>{Exam.exam_start_time}</span>
                </p>
                <p>
                  Exam Time : <span>{Exam.exam_time}</span>
                </p>
                <p>
                  End Time : <span>{Exam.exam_end_time}</span>
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="No_Exams">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/NoExams.json")}
              className="NoExamPlayer"
            />
            <p>There is No Exams </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Exam;
