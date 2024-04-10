import mongoose from "mongoose";

const Notes_Model = mongoose.Schema(
  {
    Student_ID: { type: mongoose.Types.ObjectId, required: true },
    Notes: [
      {
        NoteName: { type: String, required: true },
        NoteDescription: { type: String, required: true },
      },
    ],
  },
  {
    collection: "Notes",
  }
);

export default mongoose.model("Notes_Model", Notes_Model);
