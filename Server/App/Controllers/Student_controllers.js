// import schema from STUDENT modle
import Student_Model from "../Model/Student_Model.js";
import Parent_Model from "../Model/Parent_Model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Codes from "../utils/Codes.js";
import JWT from "../Utils/JWT.js";
import fs from "fs";

// login Student authentication
const Studetn_Login = async (Req, Res) => {
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
    const STUDENT = await Student_Model.findOne({ national_ID });
    if (STUDENT === null) {
      // invalid data in the body and not match the data in the database
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Studnt account is not exist !",
      });
    } else {
      const STUDENT_Password = await bcrypt.compare(password, STUDENT.password);
      if (STUDENT && STUDENT_Password) {
        // return ther STUDENT data
        return Res.json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: await Student_Model.findOne(
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

// Register Student authentication
const Studetn_Register = async (Req, Res) => {
  const { Mobile, email, name, national_ID, password, parent_national_ID } =
    Req.body;

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
    const Check_Parent = await Parent_Model.findOne({
      national_ID: parent_national_ID,
    });
    if (Check_Parent == null) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Create Parent account FIrst !",
      });
    }
    // Searching in the database with email may be email is wrong
    const Check_Student = await Student_Model.findOne({ national_ID });
    if (Check_Student) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Student Is already exist",
      });
    } else {
      const Hashed_Password = await bcrypt.hash(
        password,
        +process.env.HASH_PASSWORD
      );
      const Student = new Student_Model({
        name: name,
        email: email,
        Role: "STUDENT",
        password: Hashed_Password,
        Mobile: Mobile,
        national_ID: national_ID,
        parent_national_ID: parent_national_ID,
      });
      Student.Token = await JWT.Genetate_Token(Student);
      await Student.save();

      // return STUDENT data after saving it in the database
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Student account Created Successfully !",
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

// Get Specific Student from database
const Get_Specific_Student = async (Req, Res) => {
  const Student_id = Req.params.Student_id;
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
    // GEt Student Data From the Data Base
    const Student = await Student_Model.findOne(
      { _id, Token },
      { password: 0, __v: 0, Role: 0 }
    );
    if (Student_id === _id && Student !== null) {
      // return Student data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: Student,
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Student not founded",
    });
  }
};

// change Student password
const Change_Student_Password = async (Req, Res) => {
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
    // GEt Student Data From the Data Base
    const Student = await Student_Model.findOne({ _id, Token });
    const StudentPassword = await bcrypt.compare(OldPassword, Student.password);
    if (Student !== null && StudentPassword) {
      const newStudePassword = await bcrypt.hash(
        NewPassword,
        +process.env.JWT_SECRET_KEY
      );
      await Student_Model.updateOne(
        { _id, Token },
        { $set: { password: newStudePassword } }
      );
      // return Student data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Student password updated !",
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
      message: "Student password can't be updated !",
    });
  }
};

// change Student Setting
const Change_Student_Setting = async (Req, Res) => {
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
    // GEt Student Data From the Data Base
    const Student = await Student_Model.findOne(
      { _id, Token },
      { password: 0 }
    );

    if (Student !== null) {
      await Student_Model.updateOne(
        { _id, Token },
        { $set: { Location, Mobile } }
      );
      // return Student data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Student Setting updated !",
      });
    } else {
      Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "student not founded !",
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Student Setting can't be updated !",
    });
  }
};

// change Student Avatar
const Change_Student_Avatar = async (Req, Res) => {
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
    // GEt Student Data From the Data Base
    const Student = await Student_Model.findOne(
      { _id, Token },
      { password: 0 }
    );

    if (Student !== null) {
      const { Avatar } = Student;
      if (!Avatar.includes("Uploads/student.jpg")) {
        const Link = Avatar.split(`${process.env.SERVER_URI}/`)[1];
        if (fs.existsSync(Link)) {
          await fs.unlinkSync(Link);
        }
      }

      await Student_Model.updateOne(
        { _id, Token },
        {
          $set: {
            Avatar: `${process.env.SERVER_URI}/Uploads/Avatars/${Req.file.filename}`,
          },
        }
      );
      // return Student data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Student Avatar updated !",
      });
    } else {
      Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "student not founded !",
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Student Avatar can't be updated !",
    });
  }
};

// change Student Avatar
const Delete_Student_Avatar = async (Req, Res) => {
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
    // GEt Student Data From the Data Base
    const Student = await Student_Model.findOne(
      { _id, Token },
      { password: 0 }
    );

    if (Student !== null) {
      const { Avatar } = Student;
      if (!Avatar.includes("Uploads/student.jpg")) {
        const Link = Avatar.split(`${process.env.SERVER_URI}/`)[1];
        if (fs.existsSync(Link)) {
          await fs.unlinkSync(Link);
        }
      }

      await Student_Model.updateOne(
        { _id, Token },
        {
          $set: {
            Avatar: `${process.env.SERVER_URI}/Uploads/student.jpg`,
          },
        }
      );
      // return Student data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Student Avatar updated !",
      });
    } else {
      Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "student not founded !",
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Student Avatar can't be updated !",
    });
  }
};

export default {
  Studetn_Login,
  Studetn_Register,
  Get_Specific_Student,
  Change_Student_Password,
  Change_Student_Setting,
  Change_Student_Avatar,
  Delete_Student_Avatar,
};
