// import schema from Instructor modle
import Exam_Model from "../Model/Exam_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";

// get all Exams from back end
const Get_All_Exams = async (Req, Res) => {
  const Page = +Req.query.Page || 1;
  const Limit = +Req.query.Limit || 10;
  const Skip = (Page - 1) * Limit;

  try {
    const Exams = await Exam_Model.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: Skip },
      { $limit: Limit },
    ]);
    const ExamCount = await Exam_Model.aggregate([{ $count: "Count" }]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Exams,
      No_Pages: Math.ceil(ExamCount[0].Count / Limit),
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

// get Subject Exams from back end
const Get_Subject_Exams = async (Req, Res) => {
  const { Subject_Id } = Req.body;
  const Condetion = Req.Verifyed_User.Role === "STUDENT";
  const Page = +Req.query.Page || 1;
  const Limit = +Req.query.Limit || 10;
  const Skip = (Page - 1) * Limit;

  try {
    const Exams = await Exam_Model.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $match: Condetion
          ? {
              Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
              Shown: true,
            }
          : { Subject_Id: new mongoose.Types.ObjectId(Subject_Id) },
      },
      { $skip: Skip },
      { $limit: Limit },
    ]);
    const ExamCount = await Exam_Model.aggregate([{ $count: "Count" }]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Exams,
      No_Pages: Math.ceil(ExamCount[0].Count / Limit),
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

// Get Specific Exam from back end
const Get_Specific_Exam = async (Req, Res) => {
  const { Subject_Id } = Req.body;
  const _id = Req.params.Exam_id;
  const Condetion = Req.Verifyed_User.Role === "STUDENT";

  try {
    const Exam = await Exam_Model.findOne(
      Condetion
        ? {
            Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
            _id: new mongoose.Types.ObjectId(_id),
            Shown: true,
          }
        : {
            Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
            _id: new mongoose.Types.ObjectId(_id),
          },
      { __v: 0, instructor_id: 0, Subject_Id: 0 }
    );

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Exam,
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

// add Exam to back end
const Add_Exam = async (Req, Res) => {
  const { ExamEnd, ExamStart, instructor_id, Title, Subject_Id } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Add , please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Exam = new Exam_Model({
      ExamEnd: new Date(ExamEnd),
      ExamStart: new Date(ExamStart),
      instructor_id: instructor_id,
      Title: Title,
      Subject_Id: Subject_Id,
    });
    await Exam.save();

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "Exam inserted Successfully",
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

// add Exam to back end
const Add_Exam_Question = async (Req, Res) => {
  const { _id, Subject_Id, QuestionText, Options, correctAnswerIndex } =
    Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);

  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Add , please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Exam = await Exam_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: new mongoose.Types.ObjectId(_id),
    });
    const Questions = [...Exam.Questions];
    Questions.push({
      QuestionText,
      Options,
      correctAnswerIndex,
    });

    await Exam_Model.updateOne(
      {
        Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
        _id: new mongoose.Types.ObjectId(_id),
      },
      { $set: { Questions } }
    );

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "Question inserted Successfully",
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

// remove Exam from back end
const Remove_Exam = async (Req, Res) => {
  const { Subject_Id, _id } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't delete ,please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Exam = await Exam_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Exam !== null) {
      await Exam_Model.deleteOne({
        Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
        _id: _id,
      });

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Exam Deleted !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Exam Not Found !",
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

// update Exam in back end
const Update_Exam = async (Req, Res) => {
  const { Subject_Id, _id, Shown, Questions } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't update , please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Exam = await Exam_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Exam !== null) {
      await Exam_Model.updateOne(
        {
          Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
          _id: _id,
        },
        { $set: { Shown, Questions } }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Exam Updated !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Exam Not Found !",
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
  Get_All_Exams,
  Add_Exam,
  Remove_Exam,
  Update_Exam,
  Get_Subject_Exams,
  Get_Specific_Exam,
  Add_Exam_Question,
};
