import React, { useState, useCallback, useEffect } from "react";
import "./Class.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <div className="container">
          <div className="data">
            <h1> Class Room</h1>
          </div>
          {/***************** input data from user **********************/}
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
        <div className="container">
          <div className="card">
            <h1>Class </h1>
            <div className="icon-box">
              <Link to={`video call/${"a"}`}>
                <i className="fa-solid fa-tv fa-beat-fade"></i>
              </Link>
            </div>
          </div>
          <div className="card">
            <h1>Class </h1>
            <div className="icon-box">
              <Link to={`video call/${"a"}`}>
                <i className="fa-solid fa-tv fa-beat-fade"></i>
              </Link>
            </div>
          </div>
          <div className="card">
            <h1>Class </h1>
            <div className="icon-box">
              <Link to={`video call/${"a"}`}>
                <i className="fa-solid fa-tv fa-beat-fade"></i>
              </Link>
            </div>
          </div>
          <div className="card">
            <h1>Class </h1>
            <div className="icon-box">
              <Link to={`video call/${"a"}`}>
                <i className="fa-solid fa-tv fa-beat-fade"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Class;
