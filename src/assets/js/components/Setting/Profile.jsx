import React from "react";

function Profile(props) {
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
            <h5>All Details</h5>
            <p>Tha is your general Deatils</p>
          </div>
          <div className="box">
            <h5>First Name</h5>
            <input type="text" readOnly value="Omnia" />
          </div>
          <div className="box">
            <h5>Last Name </h5>
            <input type="text" readOnly value="El - Barbary" />
          </div>
          <div className="box">
            <h5>Grade</h5>
            <input type="text" readOnly value="Doctor" />
          </div>
          <div className="box">
            <h5>Number of Courses</h5>
            <input type="text" readOnly value="5655" />
          </div>
          <div className="box">
            <h5>Gpa</h5>
            <input type="text" readOnly value="4" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Profile;