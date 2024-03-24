import mongoose from "mongoose";

const Parents_Model = mongoose.Schema(
  {
    name: { type: String, required: true },
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
  },
  {
    collection: "Parents",
  }
);

export default mongoose.model("Parents_Model", Parents_Model);
