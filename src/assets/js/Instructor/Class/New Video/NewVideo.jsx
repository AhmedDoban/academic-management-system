import React, { useState, useCallback, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams, useNavigate } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./NewVideo.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function NewVideo() {
  const params = useParams("");
  const navigate = useNavigate();
  const [data, setData] = useState({
    video_title: "",
    description: "",
    video_link: "",
    subject_id: params.subject_id,
  });

  const HandeChange = useCallback((e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  });
  const HandleUpLoadVideo = () => {
    try {
      axios
        .post(
          "https://camp-coding.tech/fci_project/graduation/doctor/add_video.php",
          data,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "text/plain",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate(-1);
          } else if (response.data.status === "error") {
            toast.warn(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>{params.SubjectName}</h1>
        </div>
      </Mountain>
      <div className="NewVideo">
        <div className="container">
          {/********************************** Video Title *******************************/}
          <div className="input-card">
            <input
              type="text"
              name="video_title"
              id="video_title"
              onChange={HandeChange}
              placeholder=" "
            />
            <label htmlFor="video_title">Video Title</label>
          </div>
          {/********************************** description *******************************/}
          <div className="input-card">
            <textarea
              name="description"
              id="description"
              onChange={HandeChange}
              cols="30"
              rows="10"
              placeholder="Description ... "
            ></textarea>
          </div>
          {/********************************** Video link *******************************/}
          <div className="input-card">
            <input
              type="text"
              name="video_link"
              id="video_link"
              onChange={HandeChange}
              placeholder=" "
            />
            <label htmlFor="video_link">Video link</label>
          </div>
          {/********************************** Submit  *******************************/}
          <div className="input-card">
            <button onClick={HandleUpLoadVideo}>
              Add Video
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets4.lottiefiles.com/packages/lf20_z7DhMX.json"
                style={{ width: "50px", height: "30px" }}
              ></Player>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default NewVideo;
