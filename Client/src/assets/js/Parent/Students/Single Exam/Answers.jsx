import React from "react";

function Answers(props) {
  return (
    <React.Fragment>
      {props.Question.map((choices, index) => (
        <li key={choices}>
          <input
            type="radio"
            name={props.Question._id}
            id={choices + props.QuestionText + props._id}
            hidden
          />
          <label
            htmlFor={choices + props.Question.QuestionText + props.Question._id}
            className={
              props.correctAnswer === props.StudentAnswer &&
              props.StudentAnswer === index
                ? "Correct"
                : props.correctAnswer === index
                ? "TheCorrectAnswer"
                : props.StudentAnswer === index
                ? "TheWrongAnswer"
                : ""
            }
          >
            {choices}
          </label>
        </li>
      ))}
    </React.Fragment>
  );
}
export default Answers;
