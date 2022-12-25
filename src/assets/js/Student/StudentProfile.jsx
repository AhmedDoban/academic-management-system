import React from "react";

function StudentProfile(props) {
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
            <h5>All Details</h5>
            <p>Tha is your general Deatils</p>
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>First Name</h5>
            <input type="text" readOnly value="Omnia" />
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>Last Name </h5>
            <input type="text" readOnly value="El - Barbary" />
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>Grade</h5>
            <input type="text" readOnly value="Doctor" />
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>Number of Courses</h5>
            <input type="text" readOnly value="5655" />
          </div>
          <div
            className="box"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h5>Gpa</h5>
            <input type="text" readOnly value="4" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentProfile;
