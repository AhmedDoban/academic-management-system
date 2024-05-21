import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Room.css";

import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";

const appId = "1ab3f923ed67455f81c8e4252d91fbc5";

const Room = ({ inCall, setInCall, trackState }) => {
  const params = useParams();
  const isConnected = useIsConnected();
  const remoteUsers = useRemoteUsers();

  const [micOn, setMic] = useState(trackState.audio);
  const [cameraOn, setCamera] = useState(trackState.video);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const { user } = useSelector((state) => state.User);

  useJoin({ appid: appId, channel: params.Subject_id, token: null }, inCall);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  return (
    <div className="Room">
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
      {isConnected && (
        <React.Fragment>
          <div className="user-list">
            <div className="container">
              <div className="user">
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                  cover={user.Avatar}
                />
              </div>
              {remoteUsers.map((user) => (
                <div className="user" key={user.uid}>
                  <RemoteUser
                    cover={require("../../../../img/VideoCall.jpg")}
                    user={user}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="controls">
            <div className="container">
              <div className="box" onClick={() => setCamera((a) => !a)}>
                <i
                  className={
                    cameraOn
                      ? "fa-solid fa-video yes"
                      : "fa-solid fa-video-slash no"
                  }
                />
              </div>
              <div className="box" onClick={() => setMic((a) => !a)}>
                <i
                  className={
                    micOn
                      ? "fa-solid fa-microphone yes"
                      : "fa-solid fa-microphone-slash no"
                  }
                />
              </div>
              <button
                onClick={() => setInCall((a) => !a)}
                className="LeaveCall"
              >
                leave call
                <i className="fa-solid fa-person-walking-dashed-line-arrow-right" />
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Room;
