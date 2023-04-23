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

  const url =
    "https://camp-coding.tech/fci_project/graduation/doctor/select_exam.php";

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        setLoading(true);
        await axios
          .post(
            url,
            { doctor_id: Doctor_id, subject_id: params.SubjectID },
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
  console.log(Exams);

  const compareDates = (date) => {
    let nowdate = new Date().getTime();
    let date2 = new Date(date).getTime();

    if (nowdate > date2) {
      return -1;
    } else if (nowdate < date2) {
      return 1;
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
                  {compareDates(Exam.exam_date) > 0 ? (
                    <span>
                      <i className="fa-solid fa-circle RunningExam"></i>
                      Exam is Running now
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-circle endedExam"></i>
                      Exam is ended
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
