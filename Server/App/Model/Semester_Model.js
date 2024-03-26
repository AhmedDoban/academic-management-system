import mongoose from "mongoose";

const Semester_Model = mongoose.Schema(
  {
    name: { type: String, required: true },
    Student_ID: { type: mongoose.Types.ObjectId, required: true },
    Student_national_id: { type: Number, required: true },
    Subjects: { type: Array, required: true },
    Semester_Hours: { type: Number, required: true },
  },
  {
    collection: "Semester",
  }
);

export default mongoose.model("Semester_Model", Semester_Model);
