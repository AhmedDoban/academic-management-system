import React from "react";
import Footer from "./../components/Footer";
import { NavLink, Routes, Route } from "react-router-dom";
import NotFounded from "./../components/NotFounded";
import StudentProfile from "./StudentProfile";
import StudentPasswordpage from "./StudentPasswordpage";
import StudentPasswordOther from "./StudentPasswordOther";

function StudentSettingPage(props) {
  return (
    <React.Fragment>
      <div className="StudentSettingPage">
        <div className="container">
          <div className="img-name-settingpage">
            <img src={require("../../img/avatars/1.jpeg")} alt="slide 1 " />
            <h1>Omnia El-barbary</h1>
          </div>
          <ul className="setting-name">
            <li>
              <NavLink to="/setting/student-setting-details">
                My Details
              </NavLink>
            </li>
            <li>
              <NavLink to="/setting/student-setting-password">Password</NavLink>
            </li>
            <li>
              <NavLink to="/setting/student-setting-other">Other</NavLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path="/" element={<StudentProfile />} />
          <Route path="student-setting-details" element={<StudentProfile />} />
          <Route
            path="student-setting-password"
            element={<StudentPasswordpage />}
          />
          <Route
            path="student-setting-other"
            element={<StudentPasswordOther />}
          />
          <Route path="*" element={<NotFounded to="/NotFounded" />} />
        </Routes>

        <Footer />
      </div>
    </React.Fragment>
  );
}
export default StudentSettingPage;
