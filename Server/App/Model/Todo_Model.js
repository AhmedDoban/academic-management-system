import mongoose from "mongoose";

const Todo_Model = mongoose.Schema(
  {
    Student_ID: { type: mongoose.Types.ObjectId, required: true },
    Todos: [
      {
        Title: { type: String, required: true },
        Status: { type: Boolean, required: true, default: false },
      },
    ],
  },
  {
    collection: "Todo",
  }
);

export default mongoose.model("Todo_Model", Todo_Model);
