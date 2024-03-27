import React, { useState, useEffect } from "react";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";
import "./Exams.css";
function Exams() {
  const params = useParams("");
  const [Doctor_id, setDoctor_id] = useState([]);
  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setDoctor_id(response.doctor_id);
    } catch (error) {
      throw error;
    }
  };

  const [Exams, SetExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `${process.env.REACT_APP_API}/doctor/select_exam.php`;

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        setLoading(true);
        await axios
          .post(
            url,
            { doctor_id: Doctor_id, subject_id: params.subject_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetExams(response.data.message);
            }
          });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, Doctor_id]);

  const compareDates = (date, time) => {
    const fullTime = date.toString() + " " + time.toString();
    const givenDate = new Date(fullTime);
    const currentDate = new Date();

    if (givenDate.getTime() >= currentDate.getTime()) {
      return 1;
    } else if (givenDate.getTime() < currentDate.getTime()) {
      return -1;
    } else {
      return 0;
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> {params.SubjectName}</h1>
          <div className="card">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets4.lottiefiles.com/packages/lf20_ycbVE1.json"
              style={{ width: "50px", height: "50px" }}
            ></Player>
            <Link className="btn-box" to="CreateExam">
              Creacte New Exam
            </Link>
          </div>
        </div>
      </Mountain>
      <div className="exams">
        {loading ? (
          <LodingFeachData />
        ) : Exams.length > 0 ? (
          <div className="container">
            {Exams.map((Exam) => (
              <Link
                className="exam-card"
                key={Exam.exam_id}
                to={`EditExam/${Exam.exam_id}/${Exam.exam_name}?`}
                data-aos="zoom-in"
              >
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets2.lottiefiles.com/packages/lf20_inti4oxf.json"
                  className="ExamPlayer"
                ></Player>
                <p className="examName">{Exam.exam_name}</p>
                <p className="status">
                  {compareDates(Exam.exam_date, Exam.exam_end_time) >= 0 ? (
                    <span>
                      <i className="fa-solid fa-circle RunningExam"></i>
                      Exam is Running now
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-circle endedExam"></i>
                      Exam is ended
                      {Exam.exam_date}
                    </span>
                  )}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="No_Exams">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets2.lottiefiles.com/packages/lf20_ZmsQVB.json"
              className="NoExamPlayer"
            ></Player>
            <p>There are no Exams you have created recently </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Exams;
