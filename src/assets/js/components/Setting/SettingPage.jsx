import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import NotFounded from "../Not Founded/NotFounded";

import Footer from "../Footer/Footer";
import "./SettingPage.css";
import Profile from "./Profile";
import Passwordpage from "./Passwordpage";
import OtherSetting from "./OtherSetting";

function SettingPage(props) {
  return (
    <React.Fragment>
      <div className="StudentSettingPage">
        <div className="container">
          <div className="img-name-settingpage">
            <img
              src={require("../../../img/avatars/team-2.jpg")}
              alt="slide 1 "
            />
            <h1>Omnia El-barbary</h1>
          </div>
          <ul className="setting-name">
            <li>
              <NavLink to="/setting" end>
                My Details
              </NavLink>
            </li>
            <li>
              <NavLink to="/setting/setting-password">Password</NavLink>
            </li>
            <li>
              <NavLink to="/setting/setting-other">Other</NavLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path="" element={<Profile />} />
          <Route path="setting-password" element={<Passwordpage />} />
          <Route path="setting-other" element={<OtherSetting />} />
          <Route path="*" element={<NotFounded to="/NotFounded" />} />
        </Routes>

        <Footer />
      </div>
    </React.Fragment>
  );
}
export default SettingPage;
