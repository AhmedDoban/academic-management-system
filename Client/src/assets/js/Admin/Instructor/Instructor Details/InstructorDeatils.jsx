import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./InstructorDeatils.css";

function InstructorDeatils() {
  const params = useParams();
  const [Instructor, setInstructor] = useState([]);

  return (
    <React.Fragment>
      <div className="InstructorDeatils">
        <div className="container">
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
                <h1 className="itemTitle">{Instructor.Instructor_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Instructor ID :</span>
                  <span className="itemValue">{Instructor.Instructor_id}</span>
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
                  <span className="itemKey">Instructor nat ID :</span>
                  <span className="itemValue">
                    {Instructor.Instructor_nat_id}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Instructor Code :</span>
                  <span className="itemValue">
                    {Instructor.Instructor_code}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Parent Id :</span>
                  <span className="itemValue">{Instructor.parent_id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default InstructorDeatils;
