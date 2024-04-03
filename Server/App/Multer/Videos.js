import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
ffmpeg.setFfmpegPath(ffmpegPath);

const Storage = multer.diskStorage({
  destination: (Req, File, Callback) => {
    Callback(null, "Uploads/Videos/Video");
  },
  filename: async (Req, File, Callback) => {
    const ext = File.mimetype.split("/")[1];
    const FileName = `Videos-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const FileWithExt = `${FileName}.mp4`;

    await ffmpeg(`Uploads/Videos/Video/${FileWithExt}`)
      .seekInput(6)
      .frames(1)
      .size("1280x720")
      .on("error", (err) => {
        console.error("Error generating thumbnail:", err);
      })
      .save(`Uploads/Videos/Thumbnail/${FileName}.jpg`);

    Callback(null, FileWithExt);
  },
});

const FileFilter = (Req, File, Callback) => {
  const TYPE = File.mimetype.split("/")[0];
  if (TYPE === "video") {
    Callback(null, true);
  } else {
    Callback(null, false);
  }
};

const upload_Video = multer({ storage: Storage, fileFilter: FileFilter });

export default upload_Video;
