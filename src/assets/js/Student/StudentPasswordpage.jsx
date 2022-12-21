import React from "react";

function StudentPasswordpage(props) {
  return (
    <React.Fragment>
      <div className="StudentProfile">
        <div className="container">
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>Passwoed</h5>
            <p>please enter your current password to change to your password</p>
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>Current password</h5>
            <input type="password" placeholder="Current password" />
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>New password </h5>
            <input type="password" placeholder="new password" />
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>Confirm New password</h5>
            <input type="password" placeholder="Confirm New password" />
          </div>
          <div className="box">
            <input type="button" value="Update Password" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentPasswordpage;
