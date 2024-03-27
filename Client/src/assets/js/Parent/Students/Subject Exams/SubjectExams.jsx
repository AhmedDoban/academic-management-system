import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import "./SubjectExams.css";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function SubjectExams(props) {
  const params = useParams();
  const [Data, Set_Data] = useState([]);
  const [Success, Set_Success] = useState(0);
  const [Faild, Set_Faild] = useState(0);
  const [Gpa, Set_Gpa] = useState(0);

  const [loading, Setloading] = useState(false);
  const url = `${process.env.REACT_APP_API}/select_solved.php`;

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
            let Success = 0;
            let Faild = 0;
            let gpa = 0;
            let Hours = 0;
            let ExamsLenght = res.data.message.length;
            res.data.message.map((item) => {
              let data = item.solved_exam_score.split("/");
              if (data[0] >= data[1] / 2) {
                Hours += 3;
                gpa += data[0] / data[1];
                Success++;
              } else Faild++;
            });
            Set_Success((Success / ExamsLenght) * 100);
            Set_Faild((Faild / ExamsLenght) * 100);
            Set_Gpa(((gpa / Hours) * 100).toFixed(2));
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
      {loading || Data.length <= 0 ? null : (
        <div className="progress-result">
          <div className="container">
            <div className="card">
              <CircularProgressbarWithChildren
                value={+Gpa}
                className="Gpa"
                circleRatio={0.75}
                styles={{
                  trail: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                  path: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div className="data">
                  <h1 className="GpaH">Gpa</h1>
                  <p className="GpaH">{+Gpa} %</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <div className="card">
              <CircularProgressbarWithChildren
                value={+Success}
                className="Success"
                circleRatio={0.75}
                styles={{
                  trail: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                  path: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div className="data">
                  <h1 className="SuccessH">Success</h1>
                  <p className="SuccessH">{+Success} %</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>

            <div className="card">
              <CircularProgressbarWithChildren
                value={+Faild}
                className="Faild"
                circleRatio={0.75}
                styles={{
                  trail: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                  path: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div className="data">
                  <h1 className="FaildH">Faild</h1>
                  <p className="FaildH">{+Faild} %</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      )}

      <div className="SubjectExams">
        {loading ? (
          <LodingFeachData />
        ) : Data.length > 0 ? (
          <div className="container">
            {Data.map((Exam) => (
              <Link className="card" data-aos="zoom-in" key={Exam.exam_quiz_id}>
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
