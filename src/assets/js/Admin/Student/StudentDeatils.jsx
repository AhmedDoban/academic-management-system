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
            <div className="general details">
              <div className="input">
                <label htmlFor={Student.firstName}>First Name</label>
                <input type="text" placeholder={Student.firstName} disabled />
              </div>
              <div className="input">
                <label htmlFor={Student.lastName}>last Name</label>
                <input type="text" placeholder={Student.lastName} disabled />
              </div>
              <div className="input">
                <label htmlFor={Student.email}>Email</label>
                <input type="text" placeholder={Student.email} disabled />
              </div>
              <div className="input">
                <label htmlFor={Student.password}>password</label>
                <input type="text" placeholder={Student.password} disabled />
              </div>
              <div className="input">
                <label htmlFor={Student.phone}>phone</label>
                <input type="text" placeholder={Student.phone} disabled />
              </div>
              <div className="input">
                <label htmlFor={Student.date}>date OF Birth</label>
                <input type="text" placeholder={Student.date} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentDeatils;
