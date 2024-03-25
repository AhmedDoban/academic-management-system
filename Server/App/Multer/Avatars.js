import multer from "multer";

const Storage = multer.diskStorage({
  destination: (Req, File, Callback) => {
    Callback(null, "Uploads/Avatars");
  },
  filename: (Req, File, Callback) => {
    const ext = File.mimetype.split("/")[1];
    const Fileame = `USER-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;
    Callback(null, Fileame);
  },
});

const FileFilter = (Req, File, Callback) => {
  const TYPE = File.mimetype.split("/")[0];
  if (TYPE === "image") {
    Callback(null, true);
  } else {
    Callback(null, false);
  }
};

const upload_Avatar = multer({ storage: Storage, fileFilter: FileFilter });

export default upload_Avatar;
