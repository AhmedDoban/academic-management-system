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
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`Exam/${params.subject_id}`}
          >
            <h1>Exam</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets4.lottiefiles.com/packages/lf20_h4th9ofg.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>

          {/***************** Videos  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`Videos/${params.subject_id}`}
          >
            <h1>Videos</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets3.lottiefiles.com/packages/lf20_ehfMXK.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** Summary / s  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`Summary/${params.subject_id}`}
          >
            <h1>Summary </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets6.lottiefiles.com/packages/lf20_mWCcDd.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** call Room  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`video call/${params.SubjectName}`}
          >
            <h1>Call Room </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets3.lottiefiles.com/packages/lf20_ihspk1vg.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** Notification  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`Notifications/${params.subject_id}`}
          >
            <h1>Notification</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets9.lottiefiles.com/packages/lf20_22votfwd.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** inquiries  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`Inquiries/${params.subject_id}`}
          >
            <h1>Inquiries</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets8.lottiefiles.com/packages/lf20_FyZ3MPhoNm.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** Chat Room  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`Chat/${params.SubjectName}`}
          >
            <h1>Chat Room</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets9.lottiefiles.com/private_files/lf30_z588h1j0.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** Chat Bot  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`ChatBot`}
          >
            <h1>Chat Bot</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets5.lottiefiles.com/packages/lf20_4soa34Y516.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SubjectData;
