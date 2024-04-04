import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Exams.css";
import Answers from "./Answers";
import Mountain from "../../../components/Mountain Template/Mountain";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleExams,
  StudentAnswerExam,
} from "../../../../Toolkit/Slices/ExamsSlice";
import Toast_Handelar from "../../../components/Toast_Handelar";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";

function ExamPage() {
  const Navigate = useNavigate();
  const params = useParams();
  const Dispatch = useDispatch();
  const [StudentAnswers, SetStudentAnswers] = useState([]);
  const { SingleExamQuestions, loading } = useSelector((state) => state.Exams);

  useEffect(() => {
    Dispatch(
      GetSingleExams({
        Subject_id: params.Subject_id,
        _id: params.Exam_id,
      })
    );
  }, []);

  const HandleSubmitExam = () => {
    if (StudentAnswers.length !== SingleExamQuestions.length) {
      Toast_Handelar("error", "Sorry, all questions must be answered !");
      return;
    } else {
      Dispatch(
        StudentAnswerExam({
          Exam_ID: params.Exam_id,
          Subject_id: params.Subject_id,
          Answers: StudentAnswers,
        })
      ).then((res) => {
        if (res.payload.Status !== "Faild") {
          Navigate(-1);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Exam </h1>
        </div>
      </Mountain>
      {loading ? (
        <LodingFeachData />
      ) : (
        <div className="ExamPage">
          <div className="container">
            {SingleExamQuestions.map((Question) => (
              <div className="card" key={Question._id}>
                <span>{Question.QuestionText}</span>
                <div className="answer-options">
                  <Answers
                    Question={Question}
                    SetStudentAnswers={SetStudentAnswers}
                    StudentAnswers={StudentAnswers}
                  />
                </div>
              </div>
            ))}
            <button className="FinshExam" onClick={() => HandleSubmitExam()}>
              Fininsh
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default ExamPage;
