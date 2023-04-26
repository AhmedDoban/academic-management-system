import React, { useState, useEffect } from "react";
import axios from "axios";
import Mountain from "../../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Exams.css";

function AddNewQu() {
  const params = useParams("");
  const [question_text, Setquestion_text] = useState("");
  const [question_answers, SetQuestionAnswers] = useState([]);
  const [question_answersField, Setquestion_answersField] = useState("");
  const [question_valid_answer, Setquestion_valid_answer] = useState("");
  const [Answers, SetAnswers] = useState("");

  useEffect(() => {}, [question_answers, Answers]);

  const AddAnswer = () => {
    if (question_answersField !== "") {
      if (!Answers.includes(question_answersField)) {
        SetQuestionAnswers([
          ...question_answers,
          question_answersField,
          "//CAMP//",
        ]);

        SetAnswers(
          [...question_answers, ...question_answersField]
            .join("")
            .split("//CAMP//")
        );
      }
      Setquestion_answersField("");
    }
  };

  const HandleQuestionValidAnswer = (event) => {
    Setquestion_valid_answer(event.target.value);
  };
  const add_ques = async () => {
    try {
      await axios
        .post(
          "https://fci-project1231.000webhostapp.com/fci_project/doctor/add_ques.php",
          {
            question_text: question_text,
            question_answers: question_answers.join(""),
            question_valid_answer: question_valid_answer,
            question_exam_quiz_id: params.exam_id,
            image: null,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
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
            Setquestion_text("");
            SetQuestionAnswers([]);
            Setquestion_answersField("");
            Setquestion_valid_answer("");
            SetAnswers("");
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
          <h1> {params.examName}</h1>
        </div>
      </Mountain>
      <div className="addQu">
        <div className="container">
          {/* ******************** > question_text ********************/}
          <div
            className="input-field"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <input
              type="text"
              id="Question_Text"
              value={question_text}
              onChange={(e) => Setquestion_text(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="Question_Text">
              <i className="fa-solid fa-signature"></i>Question Text
            </label>
          </div>
          {question_text !== "" ? (
            <React.Fragment>
              {/* ******************** > question_answers ********************/}
              <div
                className="input-field"
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <input
                  type="text"
                  id="Question_Answers"
                  value={question_answersField}
                  onChange={(e) => Setquestion_answersField(e.target.value)}
                  placeholder=" "
                />
                <label htmlFor="Question_Answers">
                  <i className="fa-solid fa-signature"></i>Question Answers
                </label>
                <button onClick={AddAnswer} className="addQuBtn">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              {/********************* > question_answers ********************/}
              {question_answers.length > 0 ? (
                <React.Fragment>
                  <div
                    className="input-field"
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="1000"
                  >
                    <label htmlFor="Question_Valid_Answer">
                      <i className="fa-solid fa-signature"></i>Question Valid
                      Answer
                    </label>
                    <select
                      onChange={HandleQuestionValidAnswer}
                      id="Question_Valid_Answer"
                    >
                      <option disabled selected>
                        Chose an Answer
                      </option>

                      {Answers.map((p, index) => (
                        <option value={p} key={index}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </React.Fragment>
              ) : null}

              {/********************* > Submit question ********************/}
              {question_valid_answer !== "" ? (
                <div className="input-field">
                  <button className="SubmitBun" onClick={add_ques}>
                    Submit
                  </button>
                </div>
              ) : null}
            </React.Fragment>
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default AddNewQu;
