// import schema from Instructor modle
import Exam_Model from "../Model/Exam_Model.js";
import Exam_Answer from "../Model/Exam_Answer.js";
import Subject_Model from "../Model/Subject_Model.js";
import Student_Model from "../Model/Student_Model.js";
import ISPassed_Mode from "../Model/ISPassed_Mode.js";
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
  const NewDate = new Date();

  try {
    const Exams = await Exam_Model.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $match: Condetion
          ? {
              Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
              Shown: true,
              ExamEnd: { $gt: NewDate },
              ExamStart: { $lt: NewDate },
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
  const NewDate = new Date();

  try {
    const Exam = await Exam_Model.findOne(
      Condetion
        ? {
            Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
            _id: new mongoose.Types.ObjectId(_id),
            ExamEnd: { $gt: NewDate },
            ExamStart: { $lt: NewDate },
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
      ExamEnd: ExamEnd,
      ExamStart: ExamStart,
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

// Answer Student Exam in back end
const Answer_Exam = async (Req, Res) => {
  const { Subject_Id, Student_ID, Exam_ID, Answers, Score } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Add your answers , please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Exam = await Exam_Answer.findOne({
      Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
      Student_ID: new mongoose.Types.ObjectId(Student_ID),
      Exam_ID: new mongoose.Types.ObjectId(Exam_ID),
    });

    if (Exam == null) {
      const ExamData = await Exam_Model.findOne({
        _id: new mongoose.Types.ObjectId(Exam_ID),
      });
      const NewExamAnswer = new Exam_Answer({
        Subject_Id,
        Student_ID,
        Exam_ID,
        Answers,
        Score,
      });
      await NewExamAnswer.save();

      if (ExamData.Title === "Final") {
        const { credit_hours } = await Subject_Model.findOne({
          _id: new mongoose.Types.ObjectId(Subject_Id),
        });
        CalculateTotalScore(Subject_Id, Student_ID, credit_hours);
      }

      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Your answers have been saved successfully !",
      });
    } else {
      return Res.json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "You solved this exam Before !",
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

// function to calculate the Total score
const CalculateTotalScore = async (Subject_Id, Student_ID, credit_hours) => {
  let newScore = 0;
  let QuestionsLength = 0;
  // Get All subject exam
  const AllSubjectExams = await Exam_Answer.find({
    Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
    Student_ID: new mongoose.Types.ObjectId(Student_ID),
  });

  // calculate points
  for (let i = 0; i < AllSubjectExams.length; i++) {
    newScore += AllSubjectExams[i].Score;
    QuestionsLength += AllSubjectExams[i].Answers.length;
  }

  const TotalScore = (newScore / QuestionsLength) * 100;
  const GPA = switchGPA(TotalScore);

  // get the student data
  const Student = await Student_Model.findOne({
    _id: Student_ID,
  });

  const Hours_X_Creadit = credit_hours * GPA.value;
  // update the student data
  if (Student.Gpa.Remain_Hours_To_Next_Semester <= 3) {
    await Student_Model.updateOne(
      { _id: Student_ID },
      {
        $set: { IsInsemester: false },
        $inc: {
          "Gpa.Hours_X_Creadit": +Hours_X_Creadit,
          "Gpa.All_Semester_Hours": +credit_hours,
          "Gpa.Remain_Hours_To_Next_Semester": -credit_hours,
        },
      }
    );
  } else {
    await Student_Model.updateOne(
      { _id: Student_ID },
      {
        $inc: {
          "Gpa.Hours_X_Creadit": +Hours_X_Creadit,
          "Gpa.All_Semester_Hours": +credit_hours,
          "Gpa.Remain_Hours_To_Next_Semester": -credit_hours,
        },
      }
    );
  }

  const IsStudentPassed = new ISPassed_Mode({
    Subject_Id,
    Student_ID,
    Passed: GPA.value === 0 ? false : true,
    Score: TotalScore,
    GPA: GPA.value,
    Grade: GPA.Grade,
  });
  await IsStudentPassed.save();
};

function switchGPA(gpaScore) {
  if (gpaScore >= 95) {
    return { Grade: "A+", value: 4 };
  } else if (gpaScore >= 90) {
    return { Grade: "A", value: 4 };
  } else if (gpaScore >= 85) {
    return { Grade: "A-", value: 3.67 };
  } else if (gpaScore >= 80) {
    return { Grade: "B+", value: 3.33 };
  } else if (gpaScore >= 75) {
    return { Grade: "B", value: 3 };
  } else if (gpaScore >= 70) {
    return { Grade: "B-", value: 2.67 };
  } else if (gpaScore >= 65) {
    return { Grade: "C+", value: 2.33 };
  } else if (gpaScore >= 60) {
    return { Grade: "C", value: 2 };
  } else if (gpaScore >= 55) {
    return { Grade: "C-", value: 1.67 };
  } else if (gpaScore >= 50) {
    return { Grade: "D", value: 1 };
  } else {
    return { Grade: "F", value: 0 };
  }
}

// Answer Student Exam in back end
const Studnt_Exams = async (Req, Res) => {
  const { Student_ID } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get Student Exams , please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Exam = await ISPassed_Mode.aggregate([
      { $match: { Student_ID: new mongoose.Types.ObjectId(Student_ID) } },

      {
        $lookup: {
          from: "Subject",
          localField: "Subject_Id",
          foreignField: "_id",
          as: "Subject",
        },
      },
      { $unwind: "$Subject" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ SubjectName: "$Subject.name" }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          Subject: 0,
          __v: 0,
        },
      },
    ]);

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

// Answer Student Exam in back end
const Studnt_Subject_Exams = async (Req, Res) => {
  const { Student_ID } = Req.body;
  const Subject_Id = Req.params.Subject_id;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get Student Exams , please Try again later",
      Data: Errors.array().map((arr) => arr.msg),
    });
  }
  try {
    const Exam = await Exam_Answer.aggregate([
      {
        $match: {
          Student_ID: new mongoose.Types.ObjectId(Student_ID),
          Subject_Id: new mongoose.Types.ObjectId(Subject_Id),
        },
      },
      {
        $lookup: {
          from: "Subject",
          localField: "Subject_Id",
          foreignField: "_id",
          as: "Subject",
        },
      },
      { $unwind: "$Subject" },
      {
        $lookup: {
          from: "Exam",
          localField: "Exam_ID",
          foreignField: "_id",
          as: "Exam",
        },
      },
      { $unwind: "$Exam" },

      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { ExamName: "$Exam.Title", SubjectName: "$Subject.name" },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $project: {
          Exam: 0,
          Subject: 0,
        },
      },
    ]);

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

export default {
  Get_All_Exams,
  Add_Exam,
  Remove_Exam,
  Update_Exam,
  Get_Subject_Exams,
  Get_Specific_Exam,
  Add_Exam_Question,
  Answer_Exam,
  Studnt_Exams,
  Studnt_Subject_Exams,
};
