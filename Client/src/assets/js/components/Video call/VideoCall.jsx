import React, { useState } from "react";
import Lobby from "./Lobby/Lobby";
import Room from "./Room/Room";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

const VideoCall = () => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const [inCall, setInCall] = useState(false);
  const [trackState, setTrackState] = useState({
    video: false,
    audio: false,
  });

  return (
    <AgoraRTCProvider client={client}>
      {inCall ? (
        <Room
          trackState={trackState}
          setInCall={setInCall}
          inCall={inCall}
        />
      ) : (
        <Lobby
          trackState={trackState}
          setTrackState={setTrackState}
          setInCall={setInCall}
        />
      )}
    </AgoraRTCProvider>
  );
};

export default VideoCall;
