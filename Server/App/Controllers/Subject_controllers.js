// import schema from Subjects modle
import Subject_Model from "../Model/Subject_Model.js";
import Instructor_Model from "../Model/Instructor_Model.js";
import Student_Model from "../Model/Student_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";

// get All subjects from back end
const Get_All_Subjects = async (Req, Res) => {
  const { _id, Token } = Req.body;
  const Page = +Req.query.Page || 1;
  const Limit = +Req.query.Limit || 10;
  const Skip = (Page - 1) * Limit;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get data please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Subjects = await Subject_Model.aggregate([
      { $skip: Skip },
      { $limit: Limit },
      {
        $lookup: {
          from: "Instructor",
          localField: "instructor_id",
          foreignField: "_id",
          as: "Instructor",
        },
      },
      { $unwind: "$Instructor" },
      {
        $project: {
          "Instructor.name": 1,
          "Instructor.Avatar": 1,
          time: 1,
          credit_hours: 1,
          name: 1,
          day: 1,
        },
      },
    ]);
    const SubjectsCount = await Subject_Model.aggregate([{ $count: "Count" }]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Subjects,
      No_Pages: Math.ceil(SubjectsCount[0].Count / Limit),
    });
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// get All Instructor Subjects from back end
const Get_Instructor_Subjects = async (Req, Res) => {
  const { instructor_id } = Req.body;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get data please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const InstructorSubjects = await Subject_Model.aggregate([
      {
        $match: {
          instructor_id: new mongoose.Types.ObjectId(instructor_id),
        },
      },
    ]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: InstructorSubjects,
    });
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
  Get_All_Subjects,
  Get_Instructor_Subjects,
};
