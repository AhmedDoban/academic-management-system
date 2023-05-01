import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Exams.css";
import Answers from "./Answers";
import { ToastContainer, toast } from "react-toastify";
import Mountain from "../../../components/Mountain Template/Mountain";

function ExamPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [Exams, SetExams] = useState([]);
  const [student_id, setStudent_id] = useState([]);
  const [Question, SetQuestions] = useState([]);
  const [Togle, SetTogle] = useState(false);

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };

  const APIExam = `${process.env.REACT_APP_API}/select_exam.php`;

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        await axios
          .post(
            APIExam,
            { subject_id: params.subject_id, student_id: student_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetExams(
                response.data.message.exams.filter(
                  (p) => p.exam_id === params.Exam_id
                )[0]
              );
            }
          });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [APIExam, student_id]);

  const APIQUE = `${process.env.REACT_APP_API}/select_questions.php`;

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        await axios
          .post(
            APIQUE,
            { exam_id: params.Exam_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetQuestions(response.data.message.questions);
            }
          });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [APIQUE, student_id]);

  let [Score, setScore] = useState(0);

  const HandleFinish = async () => {
    Question.map((p) =>
      p.chosen_answer === p.question_valid_answer ? setScore(Score++) : null
    );
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/upload_score.php`,
          {
            exam_id: params.Exam_id,
            student_id: student_id,
            score: Score,
            all_question: Question,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "text/plain",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "success") {
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate(-1);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Exam {Exams.exam_name}</h1>
          <button onClick={HandleFinish} className="FinshExam">
            Fininsh
          </button>
        </div>
      </Mountain>

      <div className="ExamPage">
        <div className="container">
          <div className="menu">
            <ul>
              <li>
                <span
                  className={Togle ? "active" : null}
                  onClick={() => SetTogle(!Togle)}
                >
                  PDf Data
                </span>
              </li>
              <li>
                <span
                  className={Togle ? null : "active"}
                  onClick={() => SetTogle(!Togle)}
                >
                  Answers
                </span>
              </li>
            </ul>
          </div>
        </div>
        {Togle ? (
          <iframe id="iframepdf" src={Exams.papel_link}></iframe>
        ) : (
          <div className="option">
            <div className="container">
              {Question.map((p) => (
                <div className="card" key={p.question_id}>
                  <span>{p.question_text}</span>
                  <div className="answer-options">
                    <Answers
                      Question={Question}
                      SetQuestions={SetQuestions}
                      Answers={p}
                      question_id={p.question_id}
                      question_valid_answer={p.question_valid_answer}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </React.Fragment>
  );
}
export default ExamPage;
