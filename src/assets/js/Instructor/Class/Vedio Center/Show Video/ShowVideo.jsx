import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShowVideo.css";
import axios from "axios";
import Swal from "sweetalert2";

function ShowVideo() {
  const params = useParams("");
  const [Videos, SetVideos] = useState([]);
  const url = "https://fci-project1231.000webhostapp.com/fci_project/doctor/";
  console.log(Videos);
  const fetchData = async function () {
    try {
      await axios
        .post(
          `${url}/select_videos.php`,
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
            SetVideos(response.data.message);
          }
        });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
  }, [url, params.subject_id]);

  const handleShowvideo = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Show ${data.video_title} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(
              `${url}/show_video.php`,
              { video_id: data.video_id, value: "0" },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "text/plain",
                },
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                Swal.fire("Show!", response.data.message, "success");
                fetchData();
              }
            });
        } catch (error) {
          throw error;
        }
      }
    });
  };
  const handleHidevideo = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Hide ${data.video_title} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(
              `${url}/show_video.php`,
              { video_id: data.video_id, value: "1" },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "text/plain",
                },
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                Swal.fire("Show!", response.data.message, "success");
                fetchData();
              }
            });
        } catch (error) {
          throw error;
        }
      }
    });
  };
  return (
    <React.Fragment>
      <div className="ShowVideo">
        <div className="container">
          {Videos.map((Vi) => (
            <div className="card" key={Vi.video_id}>
              <div className="data">
                <span>{Vi.video_title}</span>
                <div className="controllers">
                  {Vi.hide === "0" ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => handleHidevideo(Vi)}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => handleShowvideo(Vi)}
                    ></i>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default ShowVideo;
