import mongoose from "mongoose";

const Exam_Model = mongoose.Schema(
  {
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    instructor_id: { type: mongoose.Types.ObjectId, required: true },
    Title: {
      type: String,
      required: true,
      enum: ["Quiz", "Midterm", "Final"],
    },
    ExamStart: { type: Date, required: true },
    ExamEnd: { type: Date, required: true },
    Shown: { type: Boolean, required: true, default: true },
    Questions: [
      {
        QuestionText: { type: String },
        Options: [String],
        correctAnswerIndex: { type: Number },
      },
    ],
  },
  {
    collection: "Exam",
    timestamps: true,
  }
);

export default mongoose.model("Exam_Model", Exam_Model);
