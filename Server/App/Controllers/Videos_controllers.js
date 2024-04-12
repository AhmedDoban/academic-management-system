// import schema from Instructor modle
import Video_Model from "../Model/Video_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";
import fs from "fs";

// get all Videos from back end
const Get_All_Videos = async (Req, Res) => {
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
    const Videos = await Video_Model.aggregate([
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
      Data: Videos,
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

// add Video to back end
const Add_Videos = async (Req, Res) => {
  const { Subject_Id, Title, Description } = Req.body;
  const File = Req.file.filename;

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
    const Video = new Video_Model({
      Subject_Id,
      Title,
      Video: `${process.env.SERVER_URI}/Uploads/Videos/Video/${File}`,
      Thumbnail: `${process.env.SERVER_URI}/Uploads/Videos/Thumbnail/${
        File.split(".")[0]
      }.jpg`,
      Description,
    });
    await Video.save();

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "New Video inserted Successfully",
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

// remove video from back end
const Remove_Videos = async (Req, Res) => {
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
    const Video = await Video_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    const Video_FILES = Video.Video;
    const Thumbnail_FILES = Video.Thumbnail;

    if (Video !== null) {
      try {
        fs.unlinkSync(Video_FILES.split(`http://localhost:3001/`)[1]);
        fs.unlinkSync(Thumbnail_FILES.split(`http://localhost:3001/`)[1]);
      } catch (err) {}

      await Video_Model.deleteOne({
        Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
        _id: _id,
      });

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Video Deleted !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Video Not Found !",
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

// update Video in back end
const Update_Videos = async (Req, Res) => {
  const { Subject_Id, _id, Description, Title } = Req.body;
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
    const Video = await Video_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Video !== null) {
      await Video_Model.updateOne(
        {
          Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
          _id: _id,
        },
        { $set: { Description, Title } }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Video Updated !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Video Not Found !",
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

// update Video in back end
const Update_Videos_Shown = async (Req, Res) => {
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
    const Video = await Video_Model.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      _id: _id,
    });
    if (Video !== null) {
      await Video_Model.updateOne(
        {
          Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
          _id: _id,
        },
        { $set: { Shown: !Video.Shown } }
      );

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Video Updated !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Video Not Found !",
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
  Get_All_Videos,
  Add_Videos,
  Remove_Videos,
  Update_Videos,
  Update_Videos_Shown,
};
