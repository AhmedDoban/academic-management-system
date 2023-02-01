import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function StudentDeatils(props) {
  const params = useParams();
  const [Student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/students/${params.id}`)
      .then((response) => {
        setStudent(response.data);
      });
  }, [params]);
  return (
    <React.Fragment>
      <div className="StudentDeatils">
        <h5 className="main-titel-2">Student Details </h5>
        <div className="data">
          <div className="left">
            {Student.profilePicture ? (
              <img src={Student.profilePicture} alt={Student.firstName} />
            ) : (
              <img src={require("../../../img/user.png")} />
            )}
          </div>
          <div className="right">
            <h5>General Details </h5>
            <div className="general details">
              <div className="input">
                <label htmlFor={Student.firstName}>First Name</label>
                <input
                  type="text"
                  value={Student.firstName}
                  readonly="readonly"
                  id={Student.firstName}
                />
              </div>
              <div className="input">
                <label htmlFor={Student.lastName}>last Name</label>
                <input
                  type="text"
                  value={Student.lastName}
                  readonly="readonly"
                />
              </div>
              <div className="input">
                <label htmlFor={Student.email}>Email</label>
                <input type="text" value={Student.email} readonly="readonly" />
              </div>
              <div className="input">
                <label htmlFor={Student.password}>password</label>
                <input
                  type="text"
                  value={Student.password}
                  readonly="readonly"
                />
              </div>
              <div className="input">
                <label htmlFor={Student.phone}>phone</label>
                <input type="text" value={Student.phone} readonly="readonly" />
              </div>
              <div className="input">
                <label htmlFor={Student.date}>date OF Birth</label>
                <input type="text" value={Student.date} readonly="readonly" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentDeatils;
