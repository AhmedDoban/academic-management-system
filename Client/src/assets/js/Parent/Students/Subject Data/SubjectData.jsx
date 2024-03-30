import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import "./SubjectData.css";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";
function SubjectData(props) {
  const params = useParams();
  const [select_solved, Set_select_solved] = useState({});
  const [loading, Setloading] = useState(false);
  const url = `${process.env.REACT_APP_API}/select_sub_generation.php`;

  const FeatchData = async () => {
    try {
      Setloading(true);
      await axios
        .post(
          url,
          {
            student_id: params.student_id,
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
            Set_select_solved(
              res.data.message.filter(
                (p) => p.generation_id === params.generation_id
              )[0]
            );
            Setloading(false);
          }
        });
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    FeatchData();
  }, [url]);

  return (
    <React.Fragment>
      <div className="SubjectData">
        {loading ? (
          <LodingFeachData />
        ) : select_solved.subjects ? (
          <div className="container">
            {select_solved.subjects.map((Subjects) => (
              <Link
                className="card"
                data-aos="zoom-in"
                key={Subjects.subject_id}
                to={`${Subjects.subject_id}`}
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                    className="PLayer"
                  />
                  <p>{Subjects.subject_name}</p>
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
              src="https://assets7.lottiefiles.com/packages/lf20_jG18nt.json"
              className="nostudent-player"
            />
            <p>Your Son haven't Taken any Exam Yet</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default SubjectData;
