import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import NotFounded from "../../components/Not Founded/NotFounded";
import Footer from "../../components/Footer/Footer";
import "./SettingPage.css";
import Profile from "./Profile";
import Passwordpage from "./Passwordpage";
import OtherSetting from "./OtherSetting";
import axios from "axios";

function SettingPage(props) {
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
      <div className="StudentSettingPage">
        <div className="container">
          <div className="img-name-settingpage">
            <img src={require("../../../img/user.png")} alt="user " />
            <h1>
              {user.firstName} {user.lastName}
            </h1>
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
          <Route exact path="" element={<Profile Data={user} />} />
          <Route
            path="setting-password"
            element={<Passwordpage Data={user} />}
          />
          <Route path="setting-other" element={<OtherSetting Data={user} />} />
          <Route path="*" element={<NotFounded to="/NotFounded" />} />
        </Routes>

        <Footer />
      </div>
    </React.Fragment>
  );
}
export default SettingPage;
