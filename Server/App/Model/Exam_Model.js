import mongoose from "mongoose";

const Exam_Model = mongoose.Schema(
  {
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    instructor_id: { type: mongoose.Types.ObjectId, required: true },
    Title: { type: String, required: true },
    ExamStart: { type: Date, required: true },
    ExamEnd: { type: Date, required: true },
  },
  {
    collection: "Exam",
    timestamps: true,
  }
);

export default mongoose.model("Exam_Model", Exam_Model);
