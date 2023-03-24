import React, { useState, useEffect } from "react";

function Profile(props) {
  const [Data, SetData] = useState([]);
  useEffect(() => {
    SetData(props.Data);
  });
  console.log(Data);
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
            <input type="text" readOnly value={Data.firstName} />
          </div>
          <div className="box">
            <h5>Last Name </h5>
            <input type="text" readOnly value={Data.lastName} />
          </div>
          <div className="box">
            <h5>Grade</h5>
            {/* <input type="text" readOnly value={Data.department?.name} /> */}
          </div>
          <div className="box">
            <h5>Number of Courses</h5>
            {/* <input type="text" readOnly value={Data.courses?.length} /> */}
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
