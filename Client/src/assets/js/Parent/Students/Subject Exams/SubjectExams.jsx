import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import "./SubjectExams.css";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";

import "react-circular-progressbar/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { GetSubjectExams } from "../../../../Toolkit/Slices/ParentSlice";

function SubjectExams(props) {
  const params = useParams();
  const Dispatch = useDispatch();
  const { Subjects, loading } = useSelector((state) => state.Parent);

  useEffect(() => {
    Dispatch(
      GetSubjectExams({
        Student_ID: params.student_id,
        Subject_id: params.Subject_Id,
      })
    );
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="SubjectExams">
        {loading ? (
          <LodingFeachData />
        ) : Subjects.length > 0 ? (
          <div className="container">
            {Subjects.map((Exam) => (
              <Link
                className="card"
                data-aos="zoom-in"
                key={Exam.Exam_ID}
                to={Exam.Exam_ID}
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../../img/Players/Exam2.json")}
                    className="PLayer"
                  />
                  <p>{Exam.SubjectName}</p>
                  <p>{Exam.ExamName}</p>
                  <span>{(Exam.Score / Exam.Answers.length) * 100} / 100</span>
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
export default SubjectExams;
