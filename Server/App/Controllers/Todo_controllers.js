// import schema from Instructor modle
import Todo_Model from "../Model/Todo_Model.js";
import Student_Model from "../Model/Student_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";

// get all Todos from back end
const Get_All_Todos = async (Req, Res) => {
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
      const Todos = await Todo_Model.findOne(
        { Student_ID: new mongoose.Types.ObjectId(Student_ID) },
        { __v: 0 }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: Todos === null ? {} : Todos,
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

// Update student Todos
const Update_Todos = async (Req, Res) => {
  const { Student_ID, Token, Todos } = Req.body;

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
      const FindTodos = await Todo_Model.findOne({
        Student_ID: new mongoose.Types.ObjectId(Student_ID),
      });
      if (FindTodos === null) {
        const NewTodos = new Todo_Model({ Student_ID, Todos });
        await NewTodos.save();

        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: { Student_ID, Todos },
        });
      } else {
        const UpdateTodo = await Todo_Model.findOneAndUpdate(
          { Student_ID: new mongoose.Types.ObjectId(Student_ID) },
          { $set: { Todos: Todos } },
          { new: true }
        );

        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: UpdateTodo,
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
  Get_All_Todos,
  Update_Todos,
};
