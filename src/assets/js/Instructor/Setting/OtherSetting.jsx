import React, { useState, useEffect } from "react";

function OtherSetting(props) {
  const [Data, SetData] = useState([]);
  useEffect(() => {
    SetData(props.Data);
  }, []);
  return (
    <React.Fragment>
      <div
        className="StudentProfile"
        data-aos="fade-right"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="box">
            <h5>Other Data</h5>
            <p>you can only change the phone number</p>
          </div>
          <div className="box">
            <h5>Email</h5>
            <input type="text" readOnly value={Data.email} />
          </div>
          <div className="box">
            <h5>Phone</h5>
            <input type="phone" maxLength={12} placeholder={Data.phone} />
          </div>
          <div className="box">
            <input type="button" value="Update Phone number" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OtherSetting;
