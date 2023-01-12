import React from "react";

function StudentPasswordOther(props) {
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
            <input type="text" readOnly value="OmniaElbarbary@gmail.com" />
          </div>
          <div className="box">
            <h5>Phone</h5>
            <input type="phone" maxLength={12} placeholder="011XXXXXX06" />
          </div>
          <div className="box">
            <input type="button" value="Update Phone number" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentPasswordOther;
