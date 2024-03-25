import React from "react";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";
import { useSelector } from "react-redux";

function Profile(props) {
  const { loading, user } = useSelector((state) => state.User);

  return (
    <React.Fragment>
      <div className="StudentProfile" data-aos="fade-right">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container">
            <div className="box">
              <h5>All Details</h5>
              <p>Tha is your general Deatils</p>
            </div>
            <div className="box">
              <h5>Name</h5>
              <input type="text" readOnly value={user.name} />
            </div>
            <div className="box">
              <h5>National ID </h5>
              <input type="text" readOnly value={user.national_ID} />
            </div>
            <div className="box">
              <h5>Gpa</h5>
              <input
                type="text"
                readOnly
                value={
                  user.Gpa.Hours_X_Creadit === 0
                    ? "0"
                    : user.Gpa.Hours_X_Creadit / user.Gpa.All_Semester_Hours
                }
              />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Profile;
