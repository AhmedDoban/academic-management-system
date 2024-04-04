// import schema from user modle
import Parent_Model from "../Model/Parent_Model.js";
import Student_Model from "../Model/Student_Model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Codes from "../utils/Codes.js";
import JWT from "../Utils/JWT.js";
import fs from "fs";

// login Parent authentication
const Parent_Login = async (Req, Res) => {
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
    const USER = await Parent_Model.findOne({ national_ID });
    if (USER === null) {
      // invalid data in the body and not match the data in the database
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Parent account is not exist !",
      });
    } else {
      const USER_Password = await bcrypt.compare(password, USER.password);
      if (USER && USER_Password) {
        const Childrens = await Student_Model.find(
          {
            parent_national_ID: national_ID,
          },
          { password: 0, __v: 0, Role: 0 }
        );
        const Parent = await Parent_Model.findOne(
          { national_ID },
          { password: 0, __v: 0, Role: 0 }
        );
        // return ther user data
        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: { Childrens, Parent, Token: Parent.Token, _id: Parent._id },
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

// Register Parent authentication
const Parent_Register = async (Req, Res) => {
  const { Mobile, email, name, national_ID, password } = Req.body;

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
    const Check_Parent = await Parent_Model.findOne({ national_ID });
    if (Check_Parent) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Parent Is already exist",
      });
    } else {
      const Hashed_Password = await bcrypt.hash(
        password,
        +process.env.HASH_PASSWORD
      );
      const Parent = new Parent_Model({
        name: name,
        email: email,
        Role: "PARENT",
        password: Hashed_Password,
        Mobile: Mobile,
        national_ID: national_ID,
      });
      Parent.Token = await JWT.Genetate_Token(Parent);
      await Parent.save();

      // return user data after saving it in the database
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Parent account Created Successfully !",
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

// Get Specific Parent from database
const Get_Specific_Parent = async (Req, Res) => {
  const Parent_id = Req.params.Parent_id;
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
    const Parent = await Parent_Model.findOne(
      { _id, Token },
      { password: 0, __v: 0, Role: 0 }
    );

    // GEt Parent Data From the Data Base
    const Childrens = await Student_Model.find(
      {
        parent_national_ID: Parent.national_ID,
      },
      { password: 0, __v: 0, Role: 0 }
    );

    if (Parent_id === _id && Parent !== null) {
      // return Parent data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: { Childrens, Parent, Token: Parent.Token, _id: Parent._id },
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Parent not founded",
    });
  }
};
export default {
  Parent_Login,
  Parent_Register,
  Get_Specific_Parent,
};
