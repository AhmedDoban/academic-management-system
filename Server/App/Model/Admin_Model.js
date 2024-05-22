import mongoose from "mongoose";

const Admin_Model = mongoose.Schema(
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
      default: `${process.env.SERVER_URI}/Uploads/Admin.jpg`,
    },
    Mobile: { type: String, default: "" },
    Location: { type: String, default: "" },
  },
  { collection: "Admin" }
);

export default mongoose.model("Admin_Model", Admin_Model);
