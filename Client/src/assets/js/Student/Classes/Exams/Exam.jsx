import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Exams.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllExams } from "../../../../Toolkit/Slices/ExamsSlice";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";
function Exam() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { Exams, loading } = useSelector((state) => state.Exams);
  console.log(Exams);
  useEffect(() => {
    Dispatch(GetAllExams(params.Subject_id));
  }, []);

  const ExamStartEnd = (ExamDate) => {
    const dateObj = new Date(ExamDate);
    const Time = dateObj.getHours();
    const Min = dateObj.getMinutes();
    const newPaddedDate = `${Time}:${Min} ${Time >= 12 ? "pm" : "am"}`;
    return ` ${newPaddedDate}`;
  };

  const ExamTime = (ExamStartDate, ExamEndDate) => {
    const Start = new Date(ExamStartDate);
    const End = new Date(ExamEndDate);
    const TimeStart = Start.getHours();
    const TimeEnd = End.getHours();
    const newPaddedDate = `${TimeEnd - TimeStart}`;
    return ` ${newPaddedDate} ${newPaddedDate >= 1 ? "hour" : "Hours"}`;
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>EXAMS</h1>
        </div>
      </Mountain>
      {loading ? (
        <LodingFeachData />
      ) : (
        <React.Fragment>
          <div className="exams">
            {Exams.length > 0 ? (
              <div className="container">
                {Exams.map((Exam) => (
                  <Link
                    className="exam-card"
                    key={Exam._id}
                    to={`${Exam._id}`}
                    data-aos="zoom-in"
                  >
                    <Player
                      autoplay={true}
                      loop={true}
                      controls={false}
                      src={require("../../../../img/Players/ExamPlayer.json")}
                      className="ExamPlayer"
                    />
                    <p className="examName">{Exam.Title}</p>
                    <p>
                      Start Time : <span>{ExamStartEnd(Exam.ExamStart)}</span>
                    </p>
                    <p>
                      Exam Time :
                      <span>{ExamTime(Exam.ExamStart, Exam.ExamEnd)}</span>
                    </p>
                    <p>
                      End Time : <span>{ExamStartEnd(Exam.ExamEnd)}</span>
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
      )}
    </React.Fragment>
  );
}
export default Exam;
