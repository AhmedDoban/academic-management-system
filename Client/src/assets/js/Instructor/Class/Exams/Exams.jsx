import React, { useState, useEffect } from "react";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";
import "./Exams.css";
function Exams() {
  const params = useParams("");

  const [Exams, SetExams] = useState([
    {
      _id: "asklj",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const compareDates = (date, time) => {
    const fullTime = date.toString() + " " + time.toString();
    const givenDate = new Date(fullTime);
    const currentDate = new Date();

    if (givenDate.getTime() >= currentDate.getTime()) {
      return 1;
    } else if (givenDate.getTime() < currentDate.getTime()) {
      return -1;
    } else {
      return 0;
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Exams</h1>
          <div className="card">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/CreateExam.json")}
              style={{ width: "50px", height: "50px" }}
            />
            <Link className="btn-box" to="CreateExam">
              Creacte New Exam
            </Link>
          </div>
        </div>
      </Mountain>
      <div className="exams">
        {loading ? (
          <LodingFeachData />
        ) : Exams.length > 0 ? (
          <div className="container" data-aos="fade-down">
            {Exams.map((Exam) => (
              <Link
                className="exam-card"
                key={Exam._id}
                to={`EditExam/${Exam._id}`}
              >
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../img/Players/RunningExam.json")}
                  className="ExamPlayer"
                />
                <p className="examName">{Exam.exam_name}</p>
                {/* <p className="status">
                  {compareDates(Exam.exam_date, Exam.exam_end_time) >= 0 ? (
                    <span>
                      <i className="fa-solid fa-circle RunningExam"></i>
                      Exam is Running now
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-circle endedExam"></i>
                      Exam is ended
                      {Exam.exam_date}
                    </span>
                  )}
                </p> */}
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
            <p>There are no Exams you have created recently </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Exams;
