import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./EditVideo.css";
import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllVideos,
  UpdateVideoLocal,
  UpdateVideos,
} from "../../../../../Toolkit/Slices/VideosSlice";

function EditVideo() {
  const params = useParams("");
  const Dispatch = useDispatch();
  const { Videos } = useSelector((state) => state.Videos);
  const [ValidData, SetValidData] = useState(false);
  const [data, setData] = useState({
    Title: "",
    Description: "",
    Subject_Id: params.Subject_id,
    _id: "",
  });

  useEffect(() => {
    Dispatch(GetAllVideos(params.Subject_id));
  }, []);

  const HandeChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    },
    [data]
  );

  const HandleEditVideo = (e) => {
    setData({
      Title: e.Title,
      Description: e.Description,
      _id: e._id,
      Subject_Id: params.Subject_id,
    });
    SetValidData(true);
  };

  const HandleUpdateVideo = () => {
    Dispatch(UpdateVideos(data));
    Dispatch(UpdateVideoLocal(data));
  };

  return (
    <React.Fragment>
      {ValidData ? (
        <div className="EditVideo">
          <div className="container">
            {/********************************** Video Title *******************************/}
            <div className="input-card" data-aos="zoom-in">
              <input
                type="text"
                name="Title"
                id="Title"
                value={data.Title}
                onChange={(e) => HandeChange(e)}
                placeholder=" "
              />
              <label htmlFor="Title">Video Title</label>
            </div>
            {/********************************** video_description *******************************/}
            <div className="input-card" data-aos="zoom-in">
              <textarea
                name="Description"
                id="Description"
                onChange={(e) => HandeChange(e)}
                value={data.Description}
                cols="30"
                rows="10"
                placeholder="video description ... "
              ></textarea>
            </div>

            {/********************************** Submit  *******************************/}
            <div className="input-card">
              <button onClick={() => SetValidData(false)}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../../img/Players/Back.json")}
                  style={{ width: "50px", height: "30px" }}
                />
                Back
              </button>

              <button onClick={() => HandleUpdateVideo()}>
                update Video
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
      ) : (
        <div className="EditVideo">
          <div className="container">
            {Videos.map((Vi) => (
              <div className="card">
                <div className="data" data-aos="zoom-in">
                  <span>{Vi.Title}</span>
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => HandleEditVideo(Vi)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default EditVideo;
