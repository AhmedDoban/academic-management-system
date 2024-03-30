import mongoose from "mongoose";

const Inquiries_Model = mongoose.Schema(
  {
    Question: { type: String, required: true },
    Student_ID: { type: mongoose.Types.ObjectId, required: true },
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    Answer: { type: String },
  },
  {
    collection: "Inquiries",
    timestamps: true,
  }
);

export default mongoose.model("Inquiries_Model", Inquiries_Model);
