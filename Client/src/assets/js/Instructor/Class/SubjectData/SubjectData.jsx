import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./SubjectData.css";
function SubjectData() {
  const params = useParams("");

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>{params.SubjectName}</h1>
        </div>
      </Mountain>
      <div className="SubjectData">
        <div className="container">
          {/***************** Quiz  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            to={`Exams/${params.subject_id}/${params.SubjectName}?`}
          >
            <h1>Exam</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/Exam.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** Video Center  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            to={`VideoCenter/${params.subject_id}/${params.SubjectName}?`}
          >
            <h1>Video Center</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/VideoCenter.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** Videos  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            to={`Videos/${params.subject_id}`}
          >
            <h1>Videos</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/Videos.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** Summary / s  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            to={`SammaryCenter/${params.subject_id}/${params.SubjectName}?`}
          >
            <h1>Summary Center</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/Summary.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** call Room  **********************/}
          <Link
            className="card"
            to={`video call/${params.SubjectName}`}
            data-aos="zoom-in"
          >
            <h1>Call Room </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/CallRoom.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** call Room  **********************/}
          <Link className="card" data-aos="zoom-in">
            <h1>Chat </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/ChatRoom.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** inquiries  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            to={`InquiriesCenter/${params.subject_id}/${params.SubjectName}?`}
          >
            <h1>Inquiries Center</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/Inquiries.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SubjectData;
