// import schema from Instructor modle
import Summary_Model from "../Model/Summary_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";
import fs from "fs";

// get all Summary from back end
const Get_All_Summary = async (Req, Res) => {
  const { Subject_Id } = Req.body;
  const Condetion = Req.Verifyed_User.Role === "STUDENT";
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
    const Summary = await Summary_Model.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $match: Condetion
          ? {
              Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
              Shown: true,
            }
          : { Subject_Id: new mongoose.Types.ObjectId(Subject_Id) },
      },
    ]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Summary,
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

// add Summary to back end
const Add_Summary = async (Req, Res) => {
  const { Subject_Id, Title } = Req.body;

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
    const Summary = new Summary_Model({
      Subject_Id,
      Title,
      PDF: `${process.env.SERVER_URI}/Uploads/Summary/${Req.file.filename}`,
    });
    await Summary.save();

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "New Summary inserted Successfully",
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

// remove Summary from back end
const Remove_Summary = async (Req, Res) => {
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
    const Summary = await Summary_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    const Summary_FILES = Summary.PDF;

    if (Summary !== null) {
      try {
        fs.unlinkSync(Summary_FILES.split(`http://localhost:3001/`)[1]);
      } catch (err) {}

      await Summary_Model.deleteOne({
        Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
        _id: _id,
      });

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Summary Deleted !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Summary Not Found !",
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

// update Summary in back end
const Update_Summary = async (Req, Res) => {
  const { Subject_Id, _id, Title } = Req.body;
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
    const Summary = await Summary_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Summary !== null) {
      await Summary_Model.updateOne(
        {
          Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
          _id: _id,
        },
        { $set: { Title } }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Summary Updated !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Summary Not Found !",
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

// update Summary in back end
const Update_Summary_Shown = async (Req, Res) => {
  const { Subject_Id, _id } = Req.body;
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
    const Summary = await Summary_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Summary !== null) {
      await Summary_Model.updateOne(
        {
          Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
          _id: _id,
        },
        { $set: { Shown: !Summary.Shown } }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Summary Updated !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Summary Not Found !",
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
  Get_All_Summary,
  Add_Summary,
  Remove_Summary,
  Update_Summary,
  Update_Summary_Shown,
};
