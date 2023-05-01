import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Subjects.css";
function StudentData(props) {
  const params = useParams();
  const [select_solved, Set_select_solved] = useState([]);
  const url = `${process.env.REACT_APP_API}/select_sub_generation.php`;

  const FeatchData = async () => {
    try {
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
            Set_select_solved(res.data.message);
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
      <div className="studentData">
        {select_solved.length > 0 ? (
          <div className="container">
            {select_solved.map((Subjects) => (
              <Link
                className="card"
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
                key={Subjects.generation_id}
                to={`${Subjects.generation_id}`}
              >
                <div className="data">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                    className="PLayer"
                  ></Player>
                  <p>{Subjects.generation_name}</p>
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
            ></Player>
            <p>Your Son haven't Taken any Exam Yet</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default StudentData;
