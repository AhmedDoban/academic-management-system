import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./SubjectNotification.css";

function SubjectNotification() {
  const params = useParams();
  const [student_id, setStudent_id] = useState([]);
  const [Notification, SetNotification] = useState([]);

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };
  //   console.log(Notification);
  const url =
    "http://camp-coding.tech/fci_project/graduation/select_notification.php";

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        await axios
          .post(
            url,
            { subject_id: params.subject_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetNotification(response.data.message);
            }
          });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [url, student_id]);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Notification</h1>
        </div>
      </Mountain>
      {Notification.length > 0 ? (
        <div className="Notification">
          <div className="container">
            {/* {Notification.map((notification) => (
              <Link className="card" to={notification}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets1.lottiefiles.com/packages/lf20_mWCcDd.json"
                  className="PDFPLAyer"
                ></Player>
                <h1>{pdf.Notification_name}</h1>
              </Link>
            ))} */}
          </div>
        </div>
      ) : (
        <div className="No_Notification">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets6.lottiefiles.com/datafiles/7fhdA6zZsyPRcTo/data.json"
            className="No_NotificationPlayer"
          ></Player>
          <p>There is No Notifications </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default SubjectNotification;
