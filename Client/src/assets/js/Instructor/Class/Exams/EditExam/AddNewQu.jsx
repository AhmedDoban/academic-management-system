import React, { useState, useEffect } from "react";
import Mountain from "../../../../components/Mountain Template/Mountain";
import { useParams } from "react-router-dom";
import "react-dropdown/style.css";
import "../Exams.css";

function AddNewQu() {
  const params = useParams("");
  const [Question, SetQuestion] = useState("");
  const [NewChoice, SetNewChoice] = useState("");
  const [QuestionAnswer, SetquestionAnswer] = useState(null);
  const [Answers, SetAnswers] = useState([]);

  useEffect(() => {
    if (Answers.length === 0) {
      SetquestionAnswer(null);
    }
  }, [Answers]);

  const AddAnswer = () => {
    if (NewChoice !== "") {
      if (!Answers.includes(NewChoice)) {
        const NewAnswers = [...Answers];
        NewAnswers.push(NewChoice);
        SetAnswers(NewAnswers);
      }
      SetNewChoice("");
    }
  };

  const DeleteAnswer = (index) => {
    const NewAnswers = [...Answers];
    NewAnswers.splice(index, 1);
    SetAnswers(NewAnswers);
  };

  const AddQuestion = async () => {};

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> {params.examName}</h1>
        </div>
      </Mountain>
      <div className="addQu">
        <div className="container" data-aos="fade-down">
          {/* ******************** > question_text ********************/}
          <div className="card">
            <div className="input-field">
              <input
                type="text"
                id="Question_Text"
                value={Question}
                onChange={(e) => SetQuestion(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="Question_Text">Question Text</label>
            </div>
          </div>

          {/* ******************** > question_answers ********************/}
          <div className="card">
            <div className="input-field">
              <input
                type="text"
                id="Question_Answers"
                value={NewChoice}
                onChange={(e) => SetNewChoice(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="Question_Answers">New Choice</label>
            </div>
            <button onClick={AddAnswer} className="addQuBtn">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {/********************* > question Choices ********************/}

          <div className="card Question_Answers">
            <h1>Question Choices</h1>
            {Answers.map((answer, index) => (
              <div className="card-question" key={index}>
                <div className="input-select">
                  <input
                    type="radio"
                    value={answer}
                    id={answer}
                    name="Answer"
                    hidden
                  />
                  <label
                    htmlFor={answer}
                    onClick={() => SetquestionAnswer(index)}
                  >
                    {answer}
                  </label>
                </div>
                <i
                  className="fas fa-trash"
                  onClick={() => DeleteAnswer(index)}
                />
              </div>
            ))}
          </div>

          {/********************* > Submit question ********************/}
          {QuestionAnswer !== null && (
            <div className="card">
              <div className="input-field">
                <button className="SubmitBun" onClick={() => AddQuestion()}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default AddNewQu;
