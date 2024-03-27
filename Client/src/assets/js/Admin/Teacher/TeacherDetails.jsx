import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Teacher.css";

function TeacherDetails() {
  const params = useParams();
  const [Teacher, setTeacher] = useState([]);
  useEffect(() => {
    GetData();
  }, [params.id]);

  const GetData = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/admin/select_all_doctors.php`)
        .then((data) =>
          setTeacher(
            data.data.filter((user) => user.doctor_id === params.id)[0]
          )
        );
    } catch (err) {
      throw err;
    }
  };
  return (
    <React.Fragment>
      <div className="TeacherDeatils">
        <div className="data" data-aos="zoom-in" data-aos-easing="linear">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              // src={require("../../../img/user.png")}
              alt=""
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{Teacher.doctor_name}</h1>
              <div className="detailItem">
                <span className="itemKey">Doctor ID :</span>
                <span className="itemValue">{Teacher.doctor_id}</span>
              </div>

              <div className="detailItem">
                <span className="itemKey">Phone :</span>
                <span className="itemValue">+20 11111111111</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">company :</span>
                <span className="itemValue">FCI - TU</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Doctor Code :</span>
                <span className="itemValue">{Teacher.doctor_code}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Doctor Pass :</span>
                <span className="itemValue">{Teacher.doctor_pass}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default TeacherDetails;
