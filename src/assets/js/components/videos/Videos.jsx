import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mountain from "../Mountain Template/Mountain";
import "./Videos.css";
import Dots from "../Dots/Dots";

function Viedos(props) {
  const params = useParams();
  const [Video, SetVideo] = useState([]);
  const [VideoSRC, SetVideoSRC] = useState("");
  const [VideoTitel, SetVideoTitel] = useState("");

  const url = props.url;
  console.log(Video);

  const HandleViewVideo = (data) => {
    SetVideoSRC(data.video_link);
    SetVideoTitel(data.video_title);
  };
  useEffect(() => {
    const fetchData = async function () {
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
              SetVideo(response.data.message);
            }
          });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [url]);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Videos</h1>
        </div>
      </Mountain>
      {Video.length > 0 ? (
        <div className="specific-course">
          <div className="video" id="video">
            <Dots OtherStyle="top" />
            <Dots OtherStyle="bottom" />
            <div className="container" id="course">
              <div
                className="holder"
                data-aos="fade-down"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <div className="left">
                  <div className="top-video">
                    <p>Videos</p>
                  </div>
                  <ul>
                    {Video.map((video) => (
                      <li
                        onClick={() => HandleViewVideo(video)}
                        key={video.video_id}
                      >
                        <div className="img">
                          <img
                            src={video.video_image_link}
                            alt={video.video_title}
                          />
                        </div>
                        <div className="data">
                          {video.video_title}
                          <span>{video.video_date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right">
                  {VideoSRC ? (
                    <React.Fragment>
                      <iframe className="Frame" src={VideoSRC}></iframe>
                      <div className="info">{VideoTitel}</div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Player
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src="https://assets7.lottiefiles.com/packages/lf20_7bfNOv.json"
                        className="NoSelectedPlayer"
                      />
                      <p>Select Video </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="No_Videos">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets7.lottiefiles.com/packages/lf20_xnjr0ud9.json"
            className="NoVidosPlayer"
          ></Player>
          <p>There is No Videos </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Viedos;
