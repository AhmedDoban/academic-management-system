import React, { useState, useEffect } from "react";

function Profile(props) {
  const [user, SetUser] = useState({});

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      SetUser(response);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    GetID();
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
            <h5>All Details</h5>
            <p>Tha is your general Deatils</p>
          </div>
          <div className="box">
            <h5> Name </h5>
            <input type="text" readOnly placeholder={user.doctor_name} />
          </div>
          <div className="box">
            <h5>Doctor Pass</h5>
            <input type="text" readOnly placeholder={user.doctor_pass} />
          </div>
          <div className="box">
            <h5>Doctor Code</h5>
            <input type="text" readOnly placeholder={user.doctor_code} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Profile;
