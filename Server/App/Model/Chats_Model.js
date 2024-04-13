import mongoose from "mongoose";

const Chats_Model = mongoose.Schema(
  {
    Subject_Id: { type: mongoose.Types.ObjectId, required: true },
    User_Id: { type: mongoose.Types.ObjectId, required: true },
    User_Name: { type: String, required: true },
    User_Avatar: { type: String, required: true },
    Message: { type: String, required: true },
  },
  {
    collection: "Chats",
    timestamps: true,
  }
);

export default mongoose.model("Chats_Model", Chats_Model);
