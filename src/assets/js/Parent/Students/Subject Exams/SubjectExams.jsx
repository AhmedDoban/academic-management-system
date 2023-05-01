import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import "./SubjectExams.css";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";
function SubjectExams(props) {
  const params = useParams();
  const [Data, Set_Data] = useState([]);
  const [loading, Setloading] = useState(false);
  const url = `${process.env.REACT_APP_API}/select_solved.php`;
  console.log(Data);
  const FeatchData = async () => {
    try {
      Setloading(true);
      await axios
        .post(
          url,
          {
            student_id: params.student_id,
            subject_id: params.subject_id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "text/plain",
            },
          }
        )
        .then((res) => {
          if (res.data.status === "success") {
            Set_Data(res.data.message);
            Setloading(false);
          }
        });
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    FeatchData();
  }, []);
  return (
    <React.Fragment>
      <div className="SubjectExams">
        {loading ? (
          <LodingFeachData />
        ) : Data.length > 0 ? (
          <div className="container">
            {Data.map((Exam) => (
              <Link
                className="card"
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
                key={Exam.exam_quiz_id}
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src="https://assets9.lottiefiles.com/packages/lf20_JyhocJ9San.json"
                    className="PLayer"
                  ></Player>
                  <p>{Exam.exam_name}</p>
                  <p>{Exam.solved_exam_score}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="nostudent-container">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets9.lottiefiles.com/packages/lf20_inti4oxf.json"
              className="nostudent-player"
            ></Player>
            <p>Your Son haven't Taken any Exam Yet</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default SubjectExams;
