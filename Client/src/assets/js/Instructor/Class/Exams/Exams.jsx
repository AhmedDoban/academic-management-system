import React, { useEffect } from "react";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";
import "./Exams.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllExams } from "../../../../Toolkit/Slices/ExamsSlice";
function Exams() {
  const params = useParams("");
  const Dispatch = useDispatch();
  const { Exams, loading } = useSelector((state) => state.Exams);

  useEffect(() => {
    Dispatch(GetAllExams(params.Subject_id));
    //eslint-disable-next-line
  }, []);

  const compareDates = (End) => {
    const ExamDate = new Date(End);
    const currentDate = new Date();
    if (ExamDate.getTime() >= currentDate.getTime()) {
      return 1;
    } else if (ExamDate.getTime() < currentDate.getTime()) {
      return -1;
    } else {
      return 0;
    }
  };
  const GetEndDate = (UserDate) => {
    const dateObj = new Date(UserDate);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const pMonth = month.toString().padStart(2, "0");
    const pDay = day.toString().padStart(2, "0");
    const newPaddedDate = `${year}/${pMonth}/${pDay}`;

    return `Exam is ended on ${newPaddedDate}`;
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
                <p className="examName">{Exam.Title}</p>
                <p className="status">
                  {compareDates(Exam.ExamEnd) >= 0 ? (
                    <span>
                      <i className="fa-solid fa-circle RunningExam"></i>
                      Exam is Running now
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-circle endedExam"></i>
                      {GetEndDate(Exam.ExamEnd)}
                    </span>
                  )}
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
            <p>There are no Exams you have created recently </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Exams;
