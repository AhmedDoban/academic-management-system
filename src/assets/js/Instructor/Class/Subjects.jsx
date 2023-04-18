import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";
import "./Class.css";
function Subjects() {
  const [TextFeild, SetTextField] = useState("");
  const HandleTextFeild = () => {};
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> Class Room</h1>
          <div className="card">
            <i
              className="fa-brands fa-searchengin"
              onClick={HandleTextFeild}
            ></i>
            <input
              type="text"
              placeholder="Search . . . "
              value={TextFeild}
              onChange={(e) => SetTextField(e.target.value)}
            />
          </div>
        </div>
      </Mountain>
      <div className="subjects">
        <div className="container">
          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to="/subjects/math 1"
          >
            <h1>Math 1</h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
              style={{ width: "100px" }}
            ></Player>
          </Link>

          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to="/subjects/Elctronics"
          >
            <h1>Elctronics </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
              style={{ width: "100px" }}
            ></Player>
          </Link>

          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to="/subjects/Data structure"
          >
            <h1> Data structure </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
              style={{ width: "100px" }}
            ></Player>
          </Link>

          <Link
            className="card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            to="/subjects/English 1"
          >
            <h1>English 1 </h1>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
              style={{ width: "100px" }}
            ></Player>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Subjects;
