import React from "react";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";
import { useSelector, useDispatch } from "react-redux";
import { ChangeInputLocal, Change_USER_Setting } from "../../../Toolkit/Slices/UserSlice";

function OtherSetting() {
  const { loading, user } = useSelector((state) => state.User);
  const Dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className="InstructorProfile" data-aos="fade-right">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container">
            <div className="box">
              <h5>Other Data</h5>
              <p>
                you can only change the phone number and Your current Location
              </p>
            </div>
            <div className="box">
              <h5>Location</h5>
              <input
                type="phone"
                value={user.Location}
                name="Location"
                placeholder="Enter Your Location"
                onChange={(e) => Dispatch(ChangeInputLocal(e))}
              />
            </div>
            <div className="box">
              <h5>Email</h5>
              <input
                type="phone"
                readOnly
                value={user.email}
                placeholder="Enter Your Email"
              />
            </div>
            <div className="box">
              <h5>Phone</h5>
              <input
                type="phone"
                maxLength={12}
                placeholder="01#########"
                value={user.Mobile}
                name="Mobile"
                onChange={(e) => Dispatch(ChangeInputLocal(e))}
              />
            </div>
            <div className="box">
              <input
                type="button"
                value="Update"
                onClick={() => Dispatch(Change_USER_Setting())}
              />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default OtherSetting;
