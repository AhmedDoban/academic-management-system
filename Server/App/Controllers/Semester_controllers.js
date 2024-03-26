// import schema from Subjects modle
import Semester_Model from "../Model/Semester_Model.js";
import Student_Model from "../Model/Student_Model.js";
import { validationResult } from "express-validator";
import Codes from "../utils/Codes.js";

// get All subjects from back end
const Semester_Register_Subjects = async (Req, Res) => {
  const { Student_ID, Student_national_id, Subjects, Semester_Hours } =
    Req.body;

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
    const Student = await Student_Model.findOne({ _id: Student_ID });
    if (Student === null) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Student Not Founded !",
      });
    }
    if (Student.IsInsemester) {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Student is Already in Semester !",
      });
    }

    const Student_Old_Semesters = await Semester_Model.aggregate([
      {
        $match: {
          Student_ID: Student_ID,
          Student_national_id: Student_national_id,
        },
      },
    ]);
    await Student_Model.updateOne(
      { _id: Student_ID },
      {
        $set: {
          "Gpa.Remain_Hours_To_Next_Semester": Semester_Hours,
          IsInsemester: true,
        },
      }
    );

    const NewSemester = new Semester_Model({
      name: `Semester ${Student_Old_Semesters.length + 1}`,
      Student_national_id: Student_national_id,
      Student_ID: Student_ID,
      Subjects: Subjects,
      Semester_Hours: Semester_Hours,
    });
    await NewSemester.save();

    return Res.json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "Student semester created Successfully !",
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
  Semester_Register_Subjects,
};
