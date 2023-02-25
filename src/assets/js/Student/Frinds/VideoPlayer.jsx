import React, { useEffect, useRef, useState } from "react";

export const VideoPlayer = ({ user }) => {
  const ref = useRef();
  const [Tracks, setTracks] = useState({ audio: true, vedio: false });
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <React.Fragment>
      <div ref={ref} className="videoChat" ></div>
    </React.Fragment>
  );
};
