import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Students.css";
function StudentData(props) {
  const params = useParams();
  const [select_solved, Set_select_solved] = useState([]);
  const url = `${process.env.REACT_APP_API}/select_solved.php`;
  console.log(select_solved);
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
        <div className="container">
          {select_solved.length > 0 ? (
            <div className="card">
              <div className="data"></div>
            </div>
          ) : (
            <div className="nostudent-container">
              <div className="container">
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets7.lottiefiles.com/packages/lf20_jG18nt.json"
                  className="nostudent-player"
                ></Player>
                <p>Your Son haven't Taken any Exam Yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentData;
