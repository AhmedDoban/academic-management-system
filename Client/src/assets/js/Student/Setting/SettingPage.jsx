import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import NotFounded from "../../components/Not Founded/NotFounded";
import "./SettingPage.css";
import Profile from "./Profile";
import Passwordpage from "./Passwordpage";
import OtherSetting from "./OtherSetting";
import { useDispatch, useSelector } from "react-redux";
import Toast_Handelar from "../../components/Toast_Handelar";
import {
  ChangeStatus,
  Change_USER_Avatar,
  HandleChandeAvatar,
} from "../../../Toolkit/Slices/UserSlice";

function SettingPage(props) {
  const { user, changeAvatar } = useSelector((state) => state.User);
  const [File, setFile] = useState(null);
  const Dispatch = useDispatch();

  const HandleChageFile = (e) => {
    const NewFile = e.target.files[0];
    if (NewFile.type.split("/")[0] === "image") {
      if ((NewFile.size / 1000).toFixed(0) >= 1028) {
        Toast_Handelar("error", "File size cannot exceed more than 1MB");
      } else {
        setFile(NewFile);
        Dispatch(ChangeStatus(true));
        Dispatch(HandleChandeAvatar(URL.createObjectURL(NewFile)));
      }
    } else {
      Toast_Handelar("error", "File Must be an image !");
    }
  };

  const HandeAvatarGlobal = () => {
    Dispatch(Change_USER_Avatar(File));
    Dispatch(ChangeStatus(false));
    Dispatch(HandleChandeAvatar(URL.createObjectURL(File)));
  };

  const FirstName = () => {
    return user.name ? user.name.split(" ")[0] : "";
  };
  return (
    <React.Fragment>
      <div className="StudentSettingPage">
        <div className="img-name-settingpage">
          <div className="container">
            <div className="img-container">
              <input
                type="file"
                hidden
                onChange={(e) => HandleChageFile(e)}
                id="UserImage"
              />
              <label htmlFor="UserImage">
                <img
                  src={changeAvatar.status ? changeAvatar.path : user.Avatar}
                  alt="User"
                />
              </label>
            </div>
            <h1>
              Stu : {FirstName()}{" "}
              {changeAvatar.status && (
                <button
                  onClick={() => HandeAvatarGlobal()}
                  className="buttonStyle"
                >
                  Update
                </button>
              )}
            </h1>
          </div>
        </div>

        <div className="container">
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
      </div>
    </React.Fragment>
  );
}
export default SettingPage;
