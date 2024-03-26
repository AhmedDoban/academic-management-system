import mongoose from "mongoose";

const Subject_Model = mongoose.Schema(
  {
    name: { type: String, required: true },
    instructor_id: { type: mongoose.Types.ObjectId, required: true },
    credit_hours: { type: Number, required: true, default: 3 },
    time: { type: String, required: true },
    day: { type: String, required: true },
  },
  {
    collection: "Subject",
  }
);

export default mongoose.model("Subject_Model", Subject_Model);
