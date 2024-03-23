import axios from "axios";
import React, { useState, useEffect } from "react";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";

function OtherSetting() {
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
      <div className="StudentProfile" data-aos="fade-right">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container">
            <div className="box">
              <h5>Other Data</h5>
              <p>you can only change the phone number</p>
            </div>
            <div className="box">
              <h5>Student Code</h5>
              <input type="text" readOnly value={user.student_code} />
            </div>
            <div className="box">
              <h5>Phone</h5>
              <input type="phone" maxLength={12} placeholder="01#########" />
            </div>
            <div className="box">
              <input type="button" value="Update Phone number" />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default OtherSetting;
