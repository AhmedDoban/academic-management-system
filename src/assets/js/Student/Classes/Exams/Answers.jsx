import React from "react";

function Answers(props) {
  const updateState = (data, question_id) => {
    const newState = props.Question.map((obj) => {
      if (obj.question_id === question_id) {
        return { ...obj, chosen_answer: data };
      }
      return obj;
    });
    props.SetQuestions(newState);
};
console.log(props.Question);

  return (
    <React.Fragment>
      {props.Answers.real_answers.map((p) => (
        <li>
          <input
            type="radio"
            name={props.question_id}
            id={p}
            value={p}
            onClick={() => updateState(p, props.question_id)}
          />
          <label>{p}</label>
        </li>
      ))}
    </React.Fragment>
  );
}
export default Answers;
