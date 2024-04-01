import mongoose from "mongoose";

const Summary_Model = mongoose.Schema(
  {
    Title: { type: String, required: true },
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    PDF: { type: String, required: true },
    Shown: { type: Boolean, required: true, default: true },
  },
  {
    collection: "Summary",
    timestamps: true,
  }
);

export default mongoose.model("Summary_Model", Summary_Model);
