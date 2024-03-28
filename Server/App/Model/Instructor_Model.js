import mongoose from "mongoose";

const Instructor_Model = mongoose.Schema(
  {
    name: { type: String, required: true },
    national_ID: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Token: { type: String, required: true },
    Role: {
      type: String,
      enum: ["ADMIN", "STUDENT", "INSTRUCTOR", "PARENT"],
      required: true,
    },
    Avatar: {
      type: String,
      default: `${process.env.SERVER_URI}/Uploads/Instructor.jpg`,
    },
    Mobile: { type: String, default: "" },
    Location: { type: String, default: "" },
  },
  {
    collection: "Instructor",
  }
);

export default mongoose.model("Instructor_Model", Instructor_Model);
