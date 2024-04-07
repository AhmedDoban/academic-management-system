import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Student.css";

function StudentDeatils() {
  const params = useParams();
  const [Student, setStudent] = useState([]);
  useEffect(() => {
    GetData();
    //eslint-disable-next-line
  }, [params.id]);

  const GetData = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/admin/select_all_students.php`)
        .then((data) =>
          setStudent(
            data.data.filter((user) => user.student_id === params.id)[0]
          )
        );
    } catch (err) {
      throw err;
    }
  };
  return (
    <React.Fragment>
      <div className="StudentDeatils">
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
              <h1 className="itemTitle">{Student.student_name}</h1>
              <div className="detailItem">
                <span className="itemKey">Student ID :</span>
                <span className="itemValue">{Student.student_id}</span>
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
                <span className="itemKey">Student nat ID :</span>
                <span className="itemValue">{Student.student_nat_id}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Student Code :</span>
                <span className="itemValue">{Student.student_code}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Parent Id :</span>
                <span className="itemValue">{Student.parent_id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentDeatils;
