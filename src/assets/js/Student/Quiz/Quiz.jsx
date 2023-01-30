import React, { useState } from "react";
import "./quiz.css";
import { Questions } from "./../../../../dummyData";
import Blobs from "./../../components/Blobs";

const Quiz = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [Display, SetDisplay] = useState("block");
  const [Score, setScore] = useState(0);
  const [isTrue, seTrue] = useState(false);
  const [falseScore, setFalseScore] = useState(0);

  const nextQuestion = (data) => {
    if (data === true) {
      setScore(Score + 1);
    } else {
      setFalseScore(falseScore + 1);
    }

    let nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      SetDisplay("none");
    }
  };

  return (
    <React.Fragment>
      <Blobs />
      <div className="quiz">
        <div className="container">
          <div className="Quiz-data">
            <h1>Simple Quiz in Html</h1>
            <p>
              {currentQuestion + 1}/{Questions.length}
            </p>
          </div>
          <div className="quiz-container">
            <div className="quiz-text">
              <h4>{Questions[currentQuestion].QuestionText} </h4>
            </div>
            <div className="quiz-options">
              {Questions[currentQuestion].answerQuestion.map((p) => (
                <div className="option">
                  <input type="radio" name="Ahmed" id={p.id} />
                  <label htmlFor={p.id} onClick={() => seTrue(p.isTrue)}>
                    {p.answerText}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="quiz-footer">
            <button
              onClick={() => nextQuestion(isTrue)}
              style={{ display: Display }}
            >
              Next Question
            </button>
          </div>
        </div>
        <div className="result-container">
          <div className="container">
            <div className="box">
              {/********************* True Answer **************************/}
              <div className="data">
                <span>True Result</span>
                <span className="persent">{`${Score * 10}%`}</span>
              </div>
              <div className="progress">
                <span
                  style={{ width: `${Score * 10}%` }}
                  className="true"
                  data-width={`${Score * 10}%`}
                ></span>
              </div>
              {/********************* False Answer **************************/}
              <div className="data">
                <span>False Result</span>
                <span className="persent">{`${falseScore * 10}%`}</span>
              </div>
              <div className="progress">
                <span
                  style={{ width: `${falseScore * 10}%` }}
                  className="false"
                  data-width={`${falseScore * 10}%`}
                ></span>
              </div>
              {/********************* Total Answer **************************/}
              <div className="data">
                <span>Total</span>
                <span className="persent">{`${
                  (Score + falseScore) * 10
                }%`}</span>
              </div>
              <div className="progress">
                <span
                  style={{ width: `${(Score + falseScore) * 10}%` }}
                  className="total"
                  data-width={`${(Score + falseScore) * 10}%`}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Quiz;
