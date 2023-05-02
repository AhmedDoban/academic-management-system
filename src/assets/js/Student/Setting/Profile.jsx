import axios from "axios";
import React, { useState, useEffect } from "react";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";

function Profile(props) {
  const [user, SetUser] = useState({});
  const [student_id, setStudent_id] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `${process.env.REACT_APP_API}/select_profile_info.php`;
  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        setLoading(true);
        await axios
          .post(
            url,
            { student_id: student_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetUser(response.data.message);
            }
          });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, student_id]);

  return (
    <React.Fragment>
      <div
        className="StudentProfile"
        data-aos="fade-right"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
      >
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
              <input type="text" readOnly value={user.student_name} />
            </div>
            <div className="box">
              <h5>Student national ID </h5>
              <input type="text" readOnly value={user.student_nat_id} />
            </div>
            <div className="box">
              <h5>Grade</h5>
              <input type="text" readOnly value="2" />
            </div>
            <div className="box">
              <h5>Number of Courses</h5>
              <input type="text" readOnly value="4" />
            </div>
            <div className="box">
              <h5>Gpa</h5>
              <input type="text" readOnly value="4" />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Profile;
