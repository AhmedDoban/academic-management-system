import mongoose from "mongoose";

const Video_Model = mongoose.Schema(
  {
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    Video: { type: String, required: true },
    Thumbnail: { type: String, required: true },
    Shown: { type: Boolean, required: true, default: true },
  },
  {
    collection: "Videos",
    timestamps: true,
  }
);

export default mongoose.model("Video_Model", Video_Model);
