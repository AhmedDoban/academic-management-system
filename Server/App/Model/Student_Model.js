import mongoose from "mongoose";

const Student_Model = mongoose.Schema(
  {
    name: { type: String, required: true },
    parent_national_ID: { type: Number, required: true },
    national_ID: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Token: { type: String, required: true },
    Role: {
      type: String,
      enum: ["ADMIN", "STUDENT", "INSTRACTOR", "PARENT"],
      required: true,
    },
    Avatar: { type: String, default: "Uploads/avatar.jpg" },
    Mobile: { type: String, default: "" },
    Dept: { type: String, default: "" },
  },
  {
    collection: "Students",
  }
);

export default mongoose.model("Student_Model", Student_Model);
