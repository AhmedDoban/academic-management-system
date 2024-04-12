// import schema from Instructor modle
import Notes_Model from "../Model/Notes_Model.js";
import Student_Model from "../Model/Student_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";

// get all Notes from back end
const Get_All_Notes = async (Req, Res) => {
  const { Student_ID, Token } = Req.body;

  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't get Data please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    const Student = await Student_Model.findOne({ _id: Student_ID, Token });
    if (Student !== null) {
      const Notes = await Notes_Model.findOne(
        { Student_ID: new mongoose.Types.ObjectId(Student_ID) },
        { __v: 0 }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: Notes === null ? {} : Notes,
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "You are not Authorized !",
      });
    }
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// Update student Notes
const Update_Notes = async (Req, Res) => {
  const { Student_ID, Token, Notes } = Req.body;

  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't get Data please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    const Student = await Student_Model.findOne({ _id: Student_ID, Token });
    if (Student !== null) {
      const FindNotes = await Notes_Model.findOne({
        Student_ID: new mongoose.Types.ObjectId(Student_ID),
      });
      if (FindNotes === null) {
        const NewNotes = new Notes_Model({ Student_ID, Notes });
        await NewNotes.save();

        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          message: "Notes updated !",
        });
      } else {
        await Notes_Model.updateOne(
          { Student_ID: new mongoose.Types.ObjectId(Student_ID) },
          { $set: { Notes: Notes } }
        );

        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          message: "Notes updated !",
        });
      }
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "You are not Authorized !",
      });
    }
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

export default {
  Get_All_Notes,
  Update_Notes,
};
