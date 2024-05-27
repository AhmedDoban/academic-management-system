import Admin_Model from "../Model/Admin_Model.js";
import Parent_Model from "../Model/Parent_Model.js";
import Student_Model from "../Model/Student_Model.js";
import Instructor_Model from "../Model/Instructor_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";
import JWT from "../Utils/JWT.js";
import bcrypt from "bcrypt";

// login Admin authentication
const Admin_Login = async (Req, Res) => {
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
    const FindAdmin = await Admin_Model.findOne({ national_ID });
    if (FindAdmin === null) {
      // invalid data in the body and not match the data in the database
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Admin account is not exist !",
      });
    } else {
      const AdminPassword = await bcrypt.compare(password, FindAdmin.password);
      if (FindAdmin && AdminPassword) {
        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: await Admin_Model.findOne(
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

// Register Admin authentication
const Admin_Register = async (Req, Res) => {
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
    const Check_Admin = await Admin_Model.findOne({ national_ID });
    if (Check_Admin) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Admin Is already exist",
      });
    } else {
      const Hashed_Password = await bcrypt.hash(
        password,
        +process.env.HASH_PASSWORD
      );
      const Admin = new Admin_Model({
        name: name,
        email: email,
        Role: "ADMIN",
        password: Hashed_Password,
        Mobile: Mobile,
        national_ID: national_ID,
      });
      Admin.Token = await JWT.Genetate_Token(Admin);
      await Admin.save();

      // return Admin data after saving it in the database
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Admin account Created Successfully !",
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

// Get Specific Admin from database
const Get_Specific_Admin = async (Req, Res) => {
  const { _id, Token } = Req.body;
  const AdminId = Req.params.Admin_id;

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
    // GEt Admin Data From the Data Base
    const Admin = await Admin_Model.findOne(
      { _id, Token },
      { password: 0, __v: 0, Role: 0 }
    );
    if (AdminId === _id && Admin !== null) {
      // return Admin data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: Admin,
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Admin not founded",
    });
  }
};

// Get Admin Status from database
const Get_Admin_Status = async (Req, Res) => {
  try {
    // GEt Admin Data From the Data Base
    const Admin = await Admin_Model.aggregate([{ $match: {} }]);
    const Parent = await Parent_Model.aggregate([{ $match: {} }]);
    const Instructor = await Instructor_Model.aggregate([{ $match: {} }]);
    const Students = await Student_Model.aggregate([{ $match: {} }]);

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: {
        Admin: Admin,
        Parent: Parent,
        Instructor: Instructor,
        Students: Students,
        Status: {
          Admin: Admin.length,
          Parent: Parent.length,
          Instructor: Instructor.length,
          Students: Students.length,
        },
      },
    });
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// get single Student
const Get_Specific_Student = async (Req, Res) => {
  const Student_id = Req.params.Student_id;

  try {
    const Student = await Student_Model.findOne({ _id: Student_id });
    if (Student !== null) {
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: Student,
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Student Not Founded !",
      });
    }
  } catch (err) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

export default {
  Admin_Login,
  Get_Specific_Admin,
  Admin_Register,
  Get_Admin_Status,
  Get_Specific_Student,
};
