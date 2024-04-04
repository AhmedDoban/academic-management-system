import React from "react";

function Answers(props) {
  const updateState = (choices) => {
    const Index = props.Question.Options.indexOf(choices);

    const CheckElement = props.StudentAnswers.findIndex(
      (Aswer) => Aswer.QuestionId === props.Question._id
    );

    if (CheckElement === -1) {
      props.SetStudentAnswers([
        ...props.StudentAnswers,
        {
          QuestionId: props.Question._id,
          QuestionText: props.Question.QuestionText,
          StudentAnswer: Index,
          correctAnswer: props.Question.correctAnswerIndex,
        },
      ]);
    } else {
      const CloneData = [...props.StudentAnswers];
      CloneData[CheckElement] = {
        QuestionId: props.Question._id,
        QuestionText: props.Question.QuestionText,
        StudentAnswer: Index,
        correctAnswer: props.Question.correctAnswerIndex,
      };

      props.SetStudentAnswers(CloneData);
    }
  };

  return (
    <React.Fragment>
      {props.Question.Options.map((choices) => (
        <li key={choices}>
          <input
            type="radio"
            name={props.Question._id}
            id={choices + props.Question.QuestionText + props.Question._id}
            hidden
            onClick={() => updateState(choices)}
          />
          <label
            htmlFor={choices + props.Question.QuestionText + props.Question._id}
          >
            {choices}
          </label>
        </li>
      ))}
    </React.Fragment>
  );
}
export default Answers;
