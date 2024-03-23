import React, { useState } from "react";
import LodingFeachData from "../../../../components/Loding Feach Data/LodingFeachData";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./EditSelectedExam.css";
import axios from "axios";
import Mountain from "../../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

function EditSelectedExam() {
  const params = useParams();
  const [Exams, SetExams] = useState([]);
  const [Doctor_id, setDoctor_id] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ShowenEditExam, SetShowenEditExam] = useState({});

  const url = `${process.env.REACT_APP_API}`;

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setDoctor_id(response.doctor_id);
    } catch (error) {
      throw error;
    }
  };
  const HandleShowExam = async () => {
    try {
      await axios
        .post(
          `${url}/doctor/select_exam.php`,
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
            SetShowenEditExam(
              response.data.message.filter(
                (Data) => Data.exam_id === params.exam_id
              )[0]
            );
          }
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    GetID();
    const fetchData = async function () {
      try {
        setLoading(true);
        await axios
          .post(
            `${url}/select_questions.php`,
            { exam_id: params.exam_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetExams(response.data.message.questions);
            }
          });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    HandleShowExam();
  }, [url, params]);

  const question_textHandelar = (e, indx) => {
    const CloneData = [...Exams];
    let EditData = { ...CloneData[indx], question_text: e.target.value };
    CloneData[indx] = EditData;
    SetExams(CloneData);
  };
  const question_valid_answerHandelar = (e, indx) => {
    const CloneData = [...Exams];

    let EditData = {
      ...CloneData[indx],
      question_valid_answer: e.value,
    };
    CloneData[indx] = EditData;
    SetExams(CloneData);
  };
  const HandelUpdateChanges = async () => {
    try {
      await axios
        .post(
          `${url}/select_questions.php`,
          { exam_id: params.exam_id, questions: Exams },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "text/plain",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            console.log(response.data.message.questions);
            HandleShowExam();
          }
        });
    } catch (err) {
      throw err;
    }
  };
  const HandelUpdateShow = async () => {
    try {
      await axios
        .post(
          `${url}/doctor/update_exam_show_to_answer.php`,
          {
            exam_id: params.exam_id,
            subject_id: params.subject_id,
            value: ShowenEditExam.show === "0" ? "1" : "0",
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "text/plain",
            },
          }
        )
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
            HandleShowExam();
          }
          if (response.data.status === "error") {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    } catch (err) {
      throw err;
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> Ediit {params.examName}</h1>
        </div>
      </Mountain>
      <div className="EditSelectedExam">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container">
            {Exams.length > 0 ? (
              <React.Fragment>
                {Exams.map((Qu, index) => (
                  <div className="card" key={Qu.question_id}>
                    <div className="data">
                      <div className="input-card">
                        <input
                          type="text"
                          name={Qu.question_text}
                          value={Qu.question_text}
                          onChange={(e) => question_textHandelar(e, index)}
                        />
                        <label htmlFor={Qu.question_text}>Question Text</label>
                      </div>
                      <div className="input-card">
                        <p>Valid Answer Is : {Qu.question_valid_answer}</p>
                      </div>
                      <div className="input-card">
                        <Dropdown
                          options={Qu.real_answers}
                          onChange={(e) =>
                            question_valid_answerHandelar(e, index)
                          }
                          placeholder="Answers"
                          value={Qu.question_valid_answer}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="Controllers">
                  <div className="card">
                    <button onClick={HandelUpdateChanges}>
                      <Player
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src="https://assets1.lottiefiles.com/packages/lf20_2xjlo1wq.json"
                        className="Player"
                      ></Player>
                      Update Changes
                    </button>
                  </div>
                  <div className="card">
                    <button onClick={HandelUpdateShow}>
                      <Player
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src="https://assets2.lottiefiles.com/packages/lf20_iKiWos0ru0.json"
                        className="Player"
                      ></Player>
                      Make Exam{" "}
                      {ShowenEditExam.show === "0" ? "Hidden" : "Visable"}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div className="NoQu">
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets2.lottiefiles.com/packages/lf20_ZmsQVB.json"
                  className="NoQuPlayer"
                ></Player>
                <p>There are no Questions you must create Question first </p>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default EditSelectedExam;
