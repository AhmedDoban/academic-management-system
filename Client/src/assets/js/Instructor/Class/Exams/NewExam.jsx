import React, { useState } from "react";
import "./Exams.css";
import Mountain from "../../../components/Mountain Template/Mountain";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddNewExam } from "../../../../Toolkit/Slices/ExamsSlice";

function NewExam() {
  const Navigate = useNavigate();
  const params = useParams();
  const Dispatch = useDispatch();

  const [DataForm, setDataForm] = useState({
    Title: "",
    ExamStart: "",
    ExamEnd: "",
    Subject_Id: params.Subject_id,
  });

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...DataForm, [name]: value });
  };

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
              id="Title"
              name="Title"
              onChange={ChangeHandler}
              placeholder=" "
            />
            <label htmlFor="Title">
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
              name="ExamStart"
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
              name="ExamEnd"
              min={DataForm.ExamStart}
            />
          </div>
          {/* ******************** > Exam End ********************/}
          <div className="input-field">
            <button
              className="CreateExam"
              onClick={() =>
                Dispatch(AddNewExam(DataForm)).then((res) => {
                  if (res.payload.Status !== "Faild") {
                    Navigate(-1);
                  }
                })
              }
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NewExam;
