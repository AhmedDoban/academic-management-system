// import schema from Instructor modle
import Inquiries_Model from "../Model/Inquiries_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";

// get all inquiries from back end
const Get_All_Inquiries = async (Req, Res) => {
  const { Subject_Id } = Req.body;
  const Page = +Req.query.Page || 1;
  const Limit = +Req.query.Limit || 10;
  const Skip = (Page - 1) * Limit;

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
    const Inquiries = await Inquiries_Model.aggregate([
      { $sort: { createdAt: -1 } },
      { $match: { Subject_Id: new mongoose.Types.ObjectId(Subject_Id) } },
      { $skip: Skip },
      { $limit: Limit },
      {
        $lookup: {
          from: "Students",
          localField: "Student_ID",
          foreignField: "_id",
          as: "Student",
        },
      },
      { $unwind: "$Student" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ StudentName: "$Student.name" }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          Student: 0,
          __v: 0,
        },
      },
    ]);
    const SubjectsCount = await Inquiries_Model.aggregate([
      { $count: "Count" },
    ]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Inquiries,
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

// add inquiry to back end
const Add_Inquiries = async (Req, Res) => {
  const { Subject_Id, Student_ID, Question } = Req.body;
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
    const Inquiry = new Inquiries_Model({
      Subject_Id,
      Student_ID,
      Question,
    });
    await Inquiry.save();

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "Inquiry inserted Successfully",
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

// remove inquiry from back end
const Remove_Inquiries = async (Req, Res) => {
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
    const Inquiry = await Inquiries_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Inquiry !== null) {
      await Inquiries_Model.deleteOne({
        Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
        _id: _id,
      });

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Inquiry Deleted !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Inquiry Not Found !",
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

// update inquiry in back end
const Update_Inquiries = async (Req, Res) => {
  const { Subject_Id, Answer, _id } = Req.body;
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
    const Inquiry = await Inquiries_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Inquiry !== null) {
      await Inquiries_Model.updateOne(
        {
          Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
          _id: _id,
        },
        { $set: { Answer } }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Inquiry Updated !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Inquiry Not Found !",
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
  Get_All_Inquiries,
  Add_Inquiries,
  Remove_Inquiries,
  Update_Inquiries,
};
