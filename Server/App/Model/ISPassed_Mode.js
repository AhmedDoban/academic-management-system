import mongoose from "mongoose";

const ISPassed_Mode = mongoose.Schema(
  {
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    Student_ID: { type: mongoose.Types.ObjectId, required: true },
    Passed: { type: Boolean, required: true },
    Score: { type: Number, required: true },
    GPA: { type: Number, required: true },
    Grade: { type: String, required: true },
  },
  {
    collection: "Passed Student Subjects",
  }
);

export default mongoose.model("ISPassed_Mode", ISPassed_Mode);
