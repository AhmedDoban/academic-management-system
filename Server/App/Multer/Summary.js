import multer from "multer";

const Storage = multer.diskStorage({
  destination: (Req, File, Callback) => {
    Callback(null, "Uploads/Summary");
  },
  filename: (Req, File, Callback) => {
    const ext = File.mimetype.split("/")[1];
    const FileName = `PDF-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;

    Callback(null, FileName);
  },
});

const FileFilter = (Req, File, Callback) => {
  const TYPE = File.mimetype.split("/")[1];
  if (TYPE === "pdf") {
    Callback(null, true);
  } else {
    Callback(null, false);
  }
};

const upload_Summary = multer({ storage: Storage, fileFilter: FileFilter });

export default upload_Summary;
