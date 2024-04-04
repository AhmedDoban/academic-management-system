import React, { useState } from "react";
import "./Exams.css";
import Mountain from "../../../components/Mountain Template/Mountain";
import { useParams } from "react-router-dom";

function NewExam() {
  const params = useParams();

  const [DataForm, setDataForm] = useState({
    exam_name: "",
    exam_start: "",
    exam_end: "",
    subject_id: params.Subject_id,
  });

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...DataForm, [name]: value });
  };
  const HandleCreateExam = async () => {};

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>New Exam</h1>
        </div>
      </Mountain>
      <div className="newExam">
        <div className="container">
          {/* ******************** > Exam Name ********************/}
          <div className="input-field">
            <input
              type="text"
              id="ExamName"
              name="exam_name"
              onChange={ChangeHandler}
              placeholder=" "
            />
            <label htmlFor="ExamName">
              <i className="fa-solid fa-signature"></i>Exam Name
            </label>
          </div>
          {/* ******************** > Exam Start ********************/}
          <div className="input-field">
            <label htmlFor="ExamStart">
              <i className="fa-solid fa-hourglass-start"></i>Exam Start
            </label>
            <input
              type="datetime-local"
              id="ExamStart"
              name="exam_start"
              onChange={ChangeHandler}
            />
          </div>
          {/* ******************** > Exam End ********************/}
          <div className="input-field">
            <label htmlFor="ExamEnd">
              <i className="fa-solid fa-hourglass-end"></i>Exam End
            </label>
            <input
              type="datetime-local"
              onChange={ChangeHandler}
              id="ExamEnd"
              name="exam_end"
              min={DataForm.exam_start}
            />
          </div>
          {/* ******************** > Exam End ********************/}
          <div className="input-field">
            <button className="CreateExam" onClick={HandleCreateExam}>
              Create
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NewExam;
