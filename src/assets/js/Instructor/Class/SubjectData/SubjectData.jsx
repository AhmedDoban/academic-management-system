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
            to={`Exams/${params.subject_id}/${params.SubjectName}?`}
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
          {/***************** Video Center  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to={`VideoCenter/${params.subject_id}/${params.SubjectName}?`}
          >
            <h1>Video Center</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets4.lottiefiles.com/packages/lf20_tFYxgv.json"
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
            to={`SammaryCenter/${params.subject_id}/${params.SubjectName}?`}
          >
            <h1>Summary Center</h1>
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
            to={`video call/${params.SubjectName}`}
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
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
          {/***************** call Room  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h1>Chat </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets9.lottiefiles.com/private_files/lf30_z588h1j0.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** inquiries  **********************/}
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
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
        </div>
      </div>
    </React.Fragment>
  );
}
export default SubjectData;
