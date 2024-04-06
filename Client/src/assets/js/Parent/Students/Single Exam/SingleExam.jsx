import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetSingleExam,
  GetSubjectExams,
} from "../../../../Toolkit/Slices/ParentSlice";
import Answers from "./Answers";
import "./SingleExam.css";

function SingleExam() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { SingleExamAnswers } = useSelector((state) => state.Parent);
  console.log(SingleExamAnswers);
  useEffect(() => {
    if (SingleExamAnswers.length === 0) {
      Dispatch(
        GetSubjectExams({
          Student_ID: params.student_id,
          Subject_id: params.Subject_Id,
        })
      ).then((res) => {
        if (res.payload.Status !== "Faild") {
          Dispatch(GetSingleExam(params.Exam_Id));
        }
      });
    } else {
      console.log("ELSE");
      Dispatch(GetSingleExam(params.Exam_Id));
    }
  }, []);

  return (
    <React.Fragment>
      <div className="StudentExamResult">
        <div className="container">
          {SingleExamAnswers.map((Question) => (
            <div className="card" key={Question.QuestionId}>
              <span>{Question.QuestionText}</span>
              <div className="answer-options">
                <Answers
                  Question={Question.QuestionChoices}
                  _id={Question.QuestionId}
                  QuestionText={Question.QuestionText}
                  StudentAnswer={Question.StudentAnswer}
                  correctAnswer={Question.correctAnswer}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default SingleExam;
