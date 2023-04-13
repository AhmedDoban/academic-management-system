import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";

function SubjectData() {
  const params = useParams("");
  console.log(params.name);
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>{params.name}</h1>
        </div>
      </Mountain>
      <div className="SubjectData">
        <div className="container">
          {/***************** Quiz  **********************/}
          <Link className="card">
            <h1>Quiz</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets4.lottiefiles.com/packages/lf20_h4th9ofg.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** Tasks  **********************/}
          <Link className="card">
            <h1>Tasks</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets4.lottiefiles.com/packages/lf20_tFYxgv.json"
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </Link>
          {/***************** Videos  **********************/}
          <Link className="card">
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
          <Link className="card">
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
          <Link className="card" to={`video call/${params.name}`}>
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
          <Link className="card">
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
          <Link className="card">
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
