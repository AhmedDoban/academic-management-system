import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditVideo.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";

function EditVideo() {
  const params = useParams("");
  const [Videos, SetVideos] = useState([]);
  const url = "https://camp-coding.tech/fci_project/graduation/doctor/";

  const [video_title, Setvideo_title] = useState("");
  const [video_description, Setvideo_description] = useState("");
  const [video_link, Setvideo_link] = useState("");
  const [video_id, Setvideo_id] = useState("");
  const [ValidData, SetValidData] = useState(false);

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

  const HandleUpLoadVideo = () => {
    try {
      axios
        .post(
          `${url}/edit_video_data.php`,
          { video_title, video_description, video_link, video_id },
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
            HandleBack();
            fetchData();
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

  const HandleEditVideo = (VidData) => {
    Setvideo_title(VidData.video_title);
    Setvideo_description(VidData.video_description);
    Setvideo_link(VidData.video_link);
    Setvideo_id(VidData.video_id);
    SetValidData(true);
  };
  const HandleBack = () => {
    SetValidData(false);
  };

  return (
    <React.Fragment>
      {ValidData ? (
        <div className="EditVideo">
          <div className="container">
            {/********************************** Video Title *******************************/}
            <div className="input-card">
              <input
                type="text"
                name="video_title"
                id="video_title"
                value={video_title}
                onChange={(e) => Setvideo_title(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="video_title">Video Title</label>
            </div>
            {/********************************** video_description *******************************/}
            <div className="input-card">
              <textarea
                name="video_description"
                id="video_description"
                onChange={(e) => Setvideo_description(e.target.value)}
                value={video_description}
                cols="30"
                rows="10"
                placeholder="video description ... "
              ></textarea>
            </div>
            {/********************************** Video link *******************************/}
            <div className="input-card">
              <input
                type="text"
                name="video_link"
                id="video_link"
                onChange={(e) => Setvideo_link(e.target.value)}
                value={video_link}
                placeholder=" "
              />
              <label htmlFor="video_link">Video link</label>
            </div>
            {/********************************** Submit  *******************************/}
            <div className="input-card">
              <button onClick={HandleBack}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets9.lottiefiles.com/packages/lf20_ys24ctpy.json"
                  style={{ width: "50px", height: "30px" }}
                ></Player>
                Back
              </button>

              <button onClick={HandleUpLoadVideo}>
                update Video
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
      ) : (
        <div className="EditVideo">
          <div className="container">
            {Videos.map((Vi) => (
              <div className="card">
                <div className="data">
                  <span>{Vi.video_title}</span>
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => HandleEditVideo(Vi)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </React.Fragment>
  );
}
export default EditVideo;
