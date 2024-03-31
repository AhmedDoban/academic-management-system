import React, { useState, useCallback } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import "./NewVideo.css";
import Toast_Handelar from "./../../../../components/Toast_Handelar";
import axios from "axios";

function NewVideo() {
  const params = useParams("");
  const [data, setData] = useState({
    Title: "",
    Description: "",
    Subject_Id: params.Subject_id,
  });
  const [Video, SetVido] = useState(null);
  const [Progress, SetProgress] = useState(0);

  const HandeChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    },
    [data]
  );

  const HandleChangeVideo = (e) => {
    const File = e.target.files[0];
    const FileType = e.target.files[0].type.split("/")[0];
    if (FileType === "video") {
      SetVido(File);
    } else {
      Toast_Handelar("error", "File Must be an video ");
    }
  };

  const HandleUpLoadVideo = async () => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Videos/Add`,
          {
            Subject_Id: data.Subject_Id,
            Title: data.Title,
            Description: data.Description,
            Video: Video,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: Token,
            },
            onUploadProgress: (e) => {
              const progress = (e.loaded / e.total) * 100;
              SetProgress(progress);
            },
          }
        )
        .then((res) => {
          if (res.data.Status !== "Faild") {
            Toast_Handelar("success", res.data.message);
          } else {
            Toast_Handelar("error", res.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't Add Video !");
    }
  };

  return (
    <React.Fragment>
      <div className="NewVideo">
        <div className="container">
          {/********************************** Video Title *******************************/}
          <div className="input-card">
            <input
              type="text"
              name="Title"
              id="Title"
              onChange={HandeChange}
              placeholder=" "
            />
            <label htmlFor="video_title">Video Title</label>
          </div>
          {/********************************** description *******************************/}
          <div className="input-card">
            <textarea
              name="Description"
              id="Description"
              onChange={HandeChange}
              cols="30"
              rows="10"
              placeholder="Description ... "
            />
          </div>
          {/********************************** Video link *******************************/}
          <div className="input-card">
            <input
              type="file"
              name="VideoFile"
              id="VideoFile"
              onChange={(e) => HandleChangeVideo(e)}
              hidden
            />
            <label htmlFor="VideoFile">
              {Video ? Video.name : "Choose a video ..."}
            </label>
          </div>
          <div className="input-card">
            <div className="progress">
              <span style={{ width: `${Progress}%` }}></span>
            </div>
          </div>
          {/********************************** Submit  *******************************/}
          <div className="input-card">
            <button onClick={HandleUpLoadVideo}>
              Add Video
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src={require("../../../../../img/Players/Upload.json")}
                style={{ width: "50px", height: "30px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NewVideo;
