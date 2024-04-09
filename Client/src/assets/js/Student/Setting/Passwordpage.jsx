import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Toast_Handelar from "../../components/Toast_Handelar";
import { Change_USER_Password } from "../../../Toolkit/Slices/UserSlice";

function Passwordpage() {
  const Dispatch = useDispatch();
  const [Password, SetPassword] = useState({
    OldPassword: "",
    NewPassword: "",
    Re_NewPassword: "",
  });

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    SetPassword({ ...Password, [name]: value });
  };

  const HandleChangePassword = () => {
    if (Password.NewPassword !== "") {
      if (Password.NewPassword !== Password.Re_NewPassword) {
        Toast_Handelar(
          "error",
          "New password fields don't match with each other !"
        );
      } else {
        Dispatch(Change_USER_Password(Password));
      }
    } else {
      Toast_Handelar(
        "error",
        "New password fields are required and mustn't be empty !"
      );
    }
  };

  return (
    <React.Fragment>
      <div className="StudentProfile" data-aos="fade-right">
        <div className="container">
          <div className="box">
            <h5>Password </h5>
            <p>
              * please enter your current password to change your password and
              follow these instructions
            </p>
            <ol className="instructions">
              <li>Include at least one capital letter.</li>
              <li>Make it at least 8 characters long. </li>
              <li>
                Mix uppercase and lowercase letters, numbers, and special
                characters.
              </li>
              <li>Avoid common words or patterns.</li>
              <li>Use a unique password for each account.</li>
              <li>Consider using a passphrase for added security.</li>
              <li>Exclude personal information</li>
            </ol>
          </div>
          <div className="box">
            <h5>Current password</h5>
            <input
              type="password"
              placeholder="Current password"
              name="OldPassword"
              onChange={(e) => HandleChangeInput(e)}
            />
          </div>
          <div className="box">
            <h5>New password </h5>
            <input
              type="password"
              placeholder="new password"
              name="NewPassword"
              onChange={(e) => HandleChangeInput(e)}
            />
          </div>
          <div className="box">
            <h5>Confirm New password</h5>
            <input
              type="password"
              placeholder="Confirm New password"
              name="Re_NewPassword"
              onChange={(e) => HandleChangeInput(e)}
            />
          </div>
          <div className="box">
            <input
              type="button"
              value="Update Password"
              onClick={() => HandleChangePassword()}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Passwordpage;
