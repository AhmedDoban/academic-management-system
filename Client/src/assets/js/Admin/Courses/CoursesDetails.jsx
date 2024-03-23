import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Courses.css";

export default function CoursesDetails() {
  const params = useParams();

  const [Class, setClass] = useState([]);
  useEffect(() => {
    GetData();
  }, [params.id]);

  const GetData = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/admin/select_all_subject.php`)
        .then((data) =>
          setClass(data.data.filter((user) => user.subject_id === params.id)[0])
        );
    } catch (err) {
      throw err;
    }
  };
  return (
    <React.Fragment>
      <div className="ClassDeatils">
        <div
          className="data"
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              // src={require("../../../img/user.png")}
              alt=""
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{Class.subject_name}</h1>
              <div className="detailItem">
                <span className="itemKey">Subject ID :</span>
                <span className="itemValue">{Class.subject_id}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">company :</span>
                <span className="itemValue">FCI - TU</span>
              </div>

              <div className="detailItem">
                <span className="itemKey">Subject Description :</span>
                <span className="itemValue">{Class.subject_description}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Generation Id :</span>
                <span className="itemValue">{Class.generation_id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
