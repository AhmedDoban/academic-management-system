import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function TeacherDetails(props) {
  const params = useParams();
  const [Teacher, setTeacher] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/teachers/${params.id}`)
      .then((response) => {
        setTeacher(response.data);
      });
  }, [params]);
  return (
    <React.Fragment>
      <div className="TeacherDeatils">
        <h5 className="main-titel-2">Teacher Details </h5>
        <div className="data">
          <div className="left">
            {Teacher.profilePicture ? (
              <img src={Teacher.profilePicture} alt={Teacher.firstName} />
            ) : (
              <img src={require("../../../img/user.png")} />
            )}
          </div>
          <div className="right">
            <div className="general details">
              <div className="input">
                <label htmlFor={Teacher.firstName}>First Name</label>
                <input type="text" placeholder={Teacher.firstName} disabled />
              </div>
              <div className="input">
                <label htmlFor={Teacher.lastName}>last Name</label>
                <input type="text" placeholder={Teacher.lastName} disabled />
              </div>
              <div className="input">
                <label htmlFor={Teacher.email}>Email</label>
                <input type="text" placeholder={Teacher.email} disabled />
              </div>
              <div className="input">
                <label htmlFor={Teacher.password}>password</label>
                <input type="text" placeholder={Teacher.password} disabled />
              </div>
              <div className="input">
                <label htmlFor={Teacher.phone}>phone</label>
                <input type="text" placeholder={Teacher.phone} disabled />
              </div>
              <div className="input">
                <label htmlFor={Teacher.date}>date OF Birth</label>
                <input type="text" placeholder={Teacher.date} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default TeacherDetails;
