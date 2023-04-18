import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Exams.css";
function Exam() {
  const params = useParams();
  const [Exams, SetExams] = useState([]);
  const [student_id, setStudent_id] = useState([]);
  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };

  const url = "http://camp-coding.tech/fci_project/graduation/select_exam.php";

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        await axios
          .post(
            url,
            { subject_id: params.subject_id, student_id: student_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetExams(response.data.message.exams);
            }
          });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [url, student_id]);
  
  console.log(Exams);
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>EXAMS</h1>
        </div>
      </Mountain>
      <div className="exams">
        <div className="container">
          {Exams.length > 0 ? null : (
            <div className="No_Exams">
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets10.lottiefiles.com/packages/lf20_zi2xpiyh.json"
                className="NoExamPlayer"
              ></Player>
              <p>There is No Exams </p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Exam;
