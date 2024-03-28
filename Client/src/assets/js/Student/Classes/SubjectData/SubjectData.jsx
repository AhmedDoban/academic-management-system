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
            to={`Exam/${params.subject_id}`}
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
            to={`Summary/${params.subject_id}`}
          >
            <h1>Summary </h1>
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
            data-aos="zoom-in"
            to={`video call/${params.SubjectName}`}
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

          {/***************** inquiries  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            to={`Inquiries/${params.subject_id}`}
          >
            <h1>Inquiries</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/Inquiries.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** Chat Room  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            to={`Chat/${params.SubjectName}`}
          >
            <h1>Chat Room</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/ChatRoom.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          {/***************** Chat Bot  **********************/}
          <Link className="card" data-aos="zoom-in" to={`ChatBot`}>
            <h1>Chat Bot</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/ChatBot.json")}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SubjectData;
