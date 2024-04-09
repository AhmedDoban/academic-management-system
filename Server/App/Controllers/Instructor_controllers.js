// import schema from Instructor modle
import Instructor_Model from "../Model/Instructor_Model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Codes from "../utils/Codes.js";
import JWT from "../Utils/JWT.js";
import fs from "fs";

// login Instructor authentication
const Instructor_Login = async (Req, Res) => {
  const { national_ID, password } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't login please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    // Searching in the database with email may be email is wrong
    const Instructor = await Instructor_Model.findOne({ national_ID });
    if (Instructor === null) {
      // invalid data in the body and not match the data in the database
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Instructor account is not exist !",
      });
    } else {
      const Instructor_Password = await bcrypt.compare(
        password,
        Instructor.password
      );
      if (Instructor && Instructor_Password) {
        // return ther Instructor data
        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: await Instructor_Model.findOne(
            { national_ID },
            { password: 0, __v: 0, Role: 0 }
          ),
        });
      } else {
        // here found email but the password does not match
        return Res.json({
          Status: Codes.FAILD,
          Status_Code: Codes.FAILD_CODE,
          message: "Password is wrong ! ",
        });
      }
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

// Register Instructor authentication
const Instructor_Register = async (Req, Res) => {
  const { Mobile, email, name, national_ID, password } = Req.body;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);

  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Register please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    // Searching in the database with email may be email is wrong
    const Check_Instructor = await Instructor_Model.findOne({ national_ID });
    if (Check_Instructor) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Instructor Is already exist",
      });
    } else {
      const Hashed_Password = await bcrypt.hash(
        password,
        +process.env.HASH_PASSWORD
      );
      const Instructor = new Instructor_Model({
        name: name,
        email: email,
        Role: "INSTRUCTOR",
        password: Hashed_Password,
        Mobile: Mobile,
        national_ID: national_ID,
      });
      Instructor.Token = await JWT.Genetate_Token(Instructor);
      await Instructor.save();

      // return Instructor data after saving it in the database
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Instructor account Created Successfully !",
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

// Get Specific Instructor from database
const Get_Specific_Instructor = async (Req, Res) => {
  const Instructor_id = Req.params.Instructor_id;
  const { _id, Token } = Req.body;

  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get Data please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    // GEt Instructor Data From the Data Base
    const Instructor = await Instructor_Model.findOne(
      { _id, Token },
      { password: 0, __v: 0, Role: 0 }
    );
    if (Instructor_id === _id && Instructor !== null) {
      // return Instructor data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: Instructor,
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Instructor not founded",
    });
  }
};

// change Instructor password
const Change_Instructor_Password = async (Req, Res) => {
  const { OldPassword, NewPassword, Token, _id } = Req.body;

  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "please follow the instrctions !",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    // GEt Instructor Data From the Data Base
    const Instructor = await Instructor_Model.findOne({ _id, Token });
    const InstructorPassword = await bcrypt.compare(
      OldPassword,
      Instructor.password
    );
    if (Instructor !== null && InstructorPassword) {
      const newStudePassword = await bcrypt.hash(
        NewPassword,
        +process.env.JWT_SECRET_KEY
      );
      await Instructor_Model.updateOne(
        { _id, Token },
        { $set: { password: newStudePassword } }
      );
      // return Instructor data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Instructor password updated !",
      });
    } else {
      Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Password is wrong !",
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Instructor password can't be updated !",
    });
  }
};

// change Instructor Setting
const Change_Instructor_Setting = async (Req, Res) => {
  const { Mobile, Location, Token, _id } = Req.body;

  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry something happened wrong !",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    // GEt Instructor Data From the Data Base
    const Instructor = await Instructor_Model.findOne(
      { _id, Token },
      { password: 0 }
    );

    if (Instructor !== null) {
      await Instructor_Model.updateOne(
        { _id, Token },
        { $set: { Location, Mobile } }
      );
      // return Instructor data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Instructor Setting updated !",
      });
    } else {
      Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Instructor not founded !",
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Instructor Setting can't be updated !",
    });
  }
};

// change Instructor Avatar
const Change_Instructor_Avatar = async (Req, Res) => {
  const { Token, _id } = Req.body;
  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry something happened wrong !",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    // GEt Instructor Data From the Data Base
    const Instructor = await Instructor_Model.findOne(
      { _id, Token },
      { password: 0 }
    );

    if (Instructor !== null) {
      const { Avatar } = Instructor;
      if (!Avatar.includes("Uploads/Instructor.jpg")) {
        const Link = Avatar.split(`${process.env.SERVER_URI}/`)[1];
        if (fs.existsSync(Link)) {
          await fs.unlinkSync(Link);
        }
      }

      await Instructor_Model.updateOne(
        { _id, Token },
        {
          $set: {
            Avatar: `${process.env.SERVER_URI}/Uploads/Avatars/${Req.file.filename}`,
          },
        }
      );
      // return Instructor data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Instructor Avatar updated !",
      });
    } else {
      Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Instructor not founded !",
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Instructor Avatar can't be updated !",
    });
  }
};

export default {
  Instructor_Login,
  Instructor_Register,
  Get_Specific_Instructor,
  Change_Instructor_Password,
  Change_Instructor_Setting,
  Change_Instructor_Avatar,
};
