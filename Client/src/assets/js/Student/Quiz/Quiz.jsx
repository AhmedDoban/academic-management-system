import React, { useState, useEffect } from "react";
import "./quiz.css";
import { Questions } from "./../../../../dummyData";
import Blobs from "./../../components/Blobs/Blobs";

const Quiz = (props) => {
  const [checked, SetChecked] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [Score, setScore] = useState(0);
  const [isTrue, seTrue] = useState(false);
  const [falseScore, setFalseScore] = useState(0);
  const [Question, SetQuestions] = useState([]);

  useEffect(() => {
    SetQuestions(Questions.sort(() => Math.random() - 0.5));
  }, []);

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
      setShowScore(true);
      setFinished(true);
    }
    SetChecked(false);
  };
  let HandeleAnswer = (p) => {
    seTrue(p.isTrue);
    SetChecked(true);
  };

  return (
    <React.Fragment>
      <Blobs />
      <div className="quiz">
        {finished ? (
          <div className="container">
            <div className="Quiz-data">
              <h1 className="main-titel">Simple Quiz in Html Final result</h1>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="Quiz-data">
              <h1 className="main-titel">Simple Quiz in Html</h1>
              <p>
                {currentQuestion + 1}/{Question.length}
              </p>
            </div>
            <div className="quiz-container">
              <div className="quiz-text">
                <h4>{Question[currentQuestion]?.QuestionText} </h4>
              </div>
              <div className="quiz-options">
                {Question[currentQuestion]?.answerQuestion.map((p) => (
                  <div className="option" key={p.id}>
                    <input
                      type="radio"
                      name="options"
                      id={p.id}
                      checked={checked}
                    />
                    <label htmlFor={p.id} onClick={() => HandeleAnswer(p)}>
                      {p.answerText}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="quiz-footer">
              <button onClick={() => nextQuestion(isTrue)}>
                Next Question
              </button>
              <button onClick={() => setShowScore(!showScore)}>
                {showScore ? (
                  <span>
                    <i className="fa-solid fa-eye-slash"></i>
                    Hide Score
                  </span>
                ) : (
                  <span>
                    <i className="fa-solid fa-eye"></i>
                    Show Score
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
        {showScore ? (
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
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Quiz;
