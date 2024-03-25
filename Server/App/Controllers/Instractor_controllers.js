// import schema from Instractor modle
import Instractor_Model from "../Model/Instractor_Model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Codes from "../utils/Codes.js";
import JWT from "../Utils/JWT.js";
import fs from "fs";

// login Instractor authentication
const Instractor_Login = async (Req, Res) => {
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
    const Instractor = await Instractor_Model.findOne({ national_ID });
    if (Instractor === null) {
      // invalid data in the body and not match the data in the database
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Instractor account is not exist !",
      });
    } else {
      const Instractor_Password = await bcrypt.compare(
        password,
        Instractor.password
      );
      if (Instractor && Instractor_Password) {
        // return ther Instractor data
        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: await Instractor_Model.findOne(
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

// Register Instractor authentication
const Instractor_Register = async (Req, Res) => {
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
    const Check_Instractor = await Instractor_Model.findOne({ national_ID });
    if (Check_Instractor) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Instractor Is already exist",
      });
    } else {
      const Hashed_Password = await bcrypt.hash(
        password,
        +process.env.HASH_PASSWORD
      );
      const Instractor = new Instractor_Model({
        name: name,
        email: email,
        Role: "INSTRACTOR",
        password: Hashed_Password,
        Mobile: Mobile,
        national_ID: national_ID,
      });
      Instractor.Token = await JWT.Genetate_Token(Instractor);
      await Instractor.save();

      // return Instractor data after saving it in the database
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Instractor account Created Successfully !",
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

// Get Specific Instractor from database
const Get_Specific_Instractor = async (Req, Res) => {
  const Instractor_id = Req.params.Instractor_id;
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
    // GEt Instractor Data From the Data Base
    const Instractor = await Instractor_Model.findOne(
      { _id, Token },
      { password: 0, __v: 0, Role: 0 }
    );
    if (Instractor_id === _id && Instractor !== null) {
      // return Instractor data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: Instractor,
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Instractor not founded",
    });
  }
};

export default {
  Instractor_Login,
  Instractor_Register,
  Get_Specific_Instractor,
};
