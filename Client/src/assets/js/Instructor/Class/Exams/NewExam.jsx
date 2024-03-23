import React, { useState } from "react";
import "./Exams.css";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewExam() {
  const params = useParams("");
  const navigate = useNavigate();
  const [DataForm, setDataForm] = useState({
    exam_name: "",
    exam_time: "1",
    exam_date: "",
    exam_start: "",
    exam_end: "",
    subject_id: params.subject_id,
  });

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...DataForm, [name]: value });
  };
  const HandleCreateExam = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/doctor/add_exam.php`, DataForm, {
          headers: {
            Accept: "application/json",
            "Content-Type": "text/plain",
          },
        })
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
          <h1> {params.SubjectName}</h1>
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
          {/* ******************** > Exam Time ********************/}
          <div className="input-field">
            <label htmlFor="ExamTime">
              <i className="fa-solid fa-stopwatch-20"></i>Exam Time{" "}
              {DataForm.exam_time} Hour
            </label>
            <input
              type="range"
              name="exam_time"
              id="ExamTime"
              onChange={ChangeHandler}
              min="1"
              max="5"
              step=".5"
              value={DataForm.exam_time}
            />
          </div>
          {/* ******************** > Exam Date ********************/}
          <div className="input-field">
            <label htmlFor="ExamDate">
              <i className="fa-solid fa-calendar-day"></i>Exam Date
            </label>
            <input
              type="date"
              name="exam_date"
              id="ExamDate"
              onChange={ChangeHandler}
            />
          </div>
          {/* ******************** > Exam Start ********************/}
          <div className="input-field">
            <label htmlFor="ExamStart">
              <i className="fa-solid fa-hourglass-start"></i>Exam Start
            </label>
            <input
              type="time"
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
              type="time"
              onChange={ChangeHandler}
              id="ExamEnd"
              name="exam_end"
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
