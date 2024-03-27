import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DeleteVideo.css";
import axios from "axios";
import Swal from "sweetalert2";

function DeleteVideo() {
  const params = useParams("");
  const [Videos, SetVideos] = useState([]);
  const url = `${process.env.REACT_APP_API}/doctor/`;
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

  const handleDeletevideo = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Delete ${data.video_title} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(
              `${url}/delete_video.php`,
              { video_id: data.video_id },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "text/plain",
                },
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                Swal.fire("Deleted!", response.data.message, "success");
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
      <div className="DeleteVideo">
        <div className="container">
          {Videos.map((Vi) => (
            <div className="card" data-aos="zoom-in">
              <div className="data">
                <span>{Vi.video_title}</span>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDeletevideo(Vi)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default DeleteVideo;
