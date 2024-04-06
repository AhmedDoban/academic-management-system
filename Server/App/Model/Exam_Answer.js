import mongoose from "mongoose";

const Exam_Answer_Model = mongoose.Schema(
  {
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    Student_ID: { type: mongoose.Types.ObjectId, required: true },
    Exam_ID: { type: mongoose.Types.ObjectId, required: true },
    Answers: [
      {
        QuestionId: { type: String, required: true },
        QuestionText: { type: String, required: true },
        QuestionChoices: { type: Array, required: true },
        StudentAnswer: { type: Number, required: true },
        correctAnswer: { type: Number, required: true },
      },
    ],
    Score: { type: Number, required: true },
  },
  {
    collection: "Exam Answer",
  }
);

export default mongoose.model("Exam_Answer_Model", Exam_Answer_Model);
