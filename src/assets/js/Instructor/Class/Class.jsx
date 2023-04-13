import React, { useState, useCallback, useEffect } from "react";
import "./Class.css";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";

function Class() {
  const [TextFeild, SetTextField] = useState("");
  const HandleTextFeild = () => {};

  const [ID, SetID] = useState([]);
  const [user, SetUser] = useState([]);

  const GEtLocal = () => {
    const userString = sessionStorage.getItem("User");
    const User_detail = JSON.parse(userString);
    SetID(User_detail.id);
  };

  const fetchData = useCallback(async () => {
    const data = await axios.get(
      "https://academic-management-system.000webhostapp.com/api/get-student-with-relationship/" +
        ID
    );
    SetUser(data.data.data);
  });

  useEffect(() => {
    GEtLocal();
    fetchData();
  }, [fetchData, user]);

  return (
    <React.Fragment>
      <div className="classRoom">
        <Mountain>
          <div className="data">
            <h1> Class Room</h1>
            <div className="card">
              <i className="fa-solid fa-plus" onClick={HandleTextFeild}></i>
              <input
                type="text"
                placeholder="Create a New Class"
                value={TextFeild}
                onChange={(e) => SetTextField(e.target.value)}
              />
            </div>
          </div>
        </Mountain>

        {/***************** Classes  **********************/}
        <div className="subjects">
          <div className="container">
            <Link className="card" to="/subjects/math">
              <h1>Math 1</h1>
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                style={{ width: "100px" }}
              ></Player>
            </Link>

            <Link className="card">
              <h1>Elctronics </h1>
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                style={{ width: "100px" }}
              ></Player>
            </Link>

            <Link className="card">
              <h1> Data structure </h1>
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                style={{ width: "100px" }}
              ></Player>
            </Link>

            <Link className="card">
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
        {/***************** End **********************/}
      </div>
    </React.Fragment>
  );
}
export default Class;
