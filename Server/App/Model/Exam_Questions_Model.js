import mongoose from "mongoose";

const Exam_Questions_Model = mongoose.Schema(
  {
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    instructor_id: { type: mongoose.Types.ObjectId, required: true },
    QuestionText: { type: String, required: true },
    Options: [String],
    correctAnswerIndex: { type: Number, required: true },
  },
  {
    collection: "Exam Questions",
  }
);

export default mongoose.model("Exam_Questions_Model", Exam_Questions_Model);
