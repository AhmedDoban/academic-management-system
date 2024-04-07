import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/city/index.css";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      preload: "auto",
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        skipButtons: {
          forward: 10,
          backward: 10,
        },
      },
    });
    // Set the source of the video
    player.src({ src });
  }, [src]);

  return <video ref={videoRef} className="video-js vjs-theme-city" />;
};
export default VideoPlayer;
