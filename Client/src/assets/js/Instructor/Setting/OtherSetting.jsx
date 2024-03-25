import React from "react";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";
import { useSelector } from "react-redux";

function OtherSetting() {
  const { loading, user } = useSelector((state) => state.User);

  return (
    <React.Fragment>
      <div className="InstractorProfile" data-aos="fade-right">
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
                readOnly
                value={user.Location}
                placeholder="Enter Your Location"
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
              />
            </div>
            <div className="box">
              <input type="button" value="Update" />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default OtherSetting;
