import "./VideoCall.css";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoCall = () => {
  const params = useParams();
  const VideoRef = useRef(null);
  const { user } = useSelector((state) => state.User);
  const [inCall, setInCall] = useState(false);
  const [Stream, SetStream] = useState(null);
  const [trackState, setTrackState] = useState({
    video: false,
    audio: false,
    Share: false,
  });

  const mute = async (type) => {
    if (type === "audio") {
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  useEffect(() => {
    if (trackState.audio || trackState.video) {
      navigator.mediaDevices.getUserMedia(trackState).then((stream) => {
        SetStream(stream);
        if (VideoRef.current) {
          VideoRef.current.srcObject = stream;
          VideoRef.current.play();
        }
      });
    }
  }, [trackState, VideoRef]);

  useEffect(() => {}, [params.id]);

  const handleJoin = (e) => {
    setInCall(true);
  };

  return (
    <React.Fragment>
      {inCall ? (
        <div className="video-container">{/* here viedo call */}</div>
      ) : (
        <React.Fragment>
          <div className="joinRoom">
            <div className="bar-head">
              <div className="container">
                <h1>call room </h1>
                <div className="actionsFake">
                  <div className="bullet"></div>
                  <div className="bullet"></div>
                  <div className="bullet"></div>
                </div>
              </div>
            </div>
            <div className="body">
              <div className="container">
                <div className="box">
                  {trackState.video ? (
                    <video ref={VideoRef} muted></video>
                  ) : (
                    <img src={user.Avatar} alt={user.name} />
                  )}
                </div>
              </div>
            </div>
            <div className="bar-bottom">
              <div className="container">
                <div className="actionsFake">
                  <div className="bullet">
                    <i
                      className={
                        trackState.video
                          ? "fa-solid fa-video yes"
                          : "fa-solid fa-video-slash no"
                      }
                      onClick={() => mute("video")}
                    />
                  </div>
                  <div className="bullet">
                    <i
                      className={
                        trackState.audio
                          ? "fa-solid fa-microphone yes"
                          : "fa-solid fa-microphone-slash no"
                      }
                      onClick={() => mute("audio")}
                    />
                  </div>
                </div>
                <button onClick={() => handleJoin()}>
                  Join call <i className="fa-solid fa-right-to-bracket"></i>
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default VideoCall;
