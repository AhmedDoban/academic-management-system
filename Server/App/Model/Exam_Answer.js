import mongoose from "mongoose";

const Exam_Model = mongoose.Schema(
  {
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    Student_ID: { type: mongoose.Types.ObjectId, required: true },
    Answers: [
      {
        QuestionId: { type: String, required: true },
        QuestionText: { type: String, required: true },
        StudentAnswer: { type: Number, required: true },
        correctAnswer: { type: Number, required: true },
      },
    ],
  },
  {
    collection: "Exam",
    timestamps: true,
  }
);

export default mongoose.model("Exam_Model", Exam_Model);
