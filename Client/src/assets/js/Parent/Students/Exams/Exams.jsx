import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Exams.css";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";
import { useDispatch, useSelector } from "react-redux";
import { GetExamsResult } from "../../../../Toolkit/Slices/ParentSlice";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GetChild } from "../../../../Toolkit/Slices/UserSlice";

function Exams() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { Exams, loading } = useSelector((state) => state.Parent);
  const { Child } = useSelector((state) => state.User);
  const GPA = Child.Gpa?.Hours_X_Creadit / Child.Gpa?.All_Semester_Hours / 4;

  useEffect(() => {
    Dispatch(
      GetExamsResult({
        _id: params.student_id,
      })
    );
    Dispatch(GetChild(params.student_id));
  }, []);

  return (
    <React.Fragment>
      {loading || Exams.length <= 0 ? null : (
        <div className="progress-result">
          <div className="container">
            <div className="card">
              <CircularProgressbarWithChildren
                value={GPA * 100}
                className="Gpa"
                circleRatio={0.75}
                styles={{
                  trail: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                  path: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div className="data">
                  <h1 className="GpaH">Total GPA</h1>
                  <p className="GpaH">
                    {Child.Gpa.Hours_X_Creadit / Child.Gpa.All_Semester_Hours}
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      )}

      <div className="Exam">
        {loading ? (
          <LodingFeachData />
        ) : Exams.length > 0 ? (
          <div className="container">
            {Exams.map((Exam) => (
              <Link
                className="card"
                data-aos="zoom-in"
                key={Exam._id}
                to={Exam.Subject_Id}
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../../img/Players/Exam.json")}
                    className="PLayer"
                  />
                  <p>{Exam.ExamName}</p>
                  <p>{Exam.SubjectName}</p>
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
              src={require("../../../../img/Players/RunningExam.json")}
              className="nostudent-player"
            />
            <p>Your Son haven't Taken the Exam Yet</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Exams;
