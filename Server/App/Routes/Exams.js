// import files
import express from "express";
import { body } from "express-validator";
import Exams_controllers from "../Controllers/Exams_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Exams
Router.route("/").post(
  JWT.Verify_Token,
  Verify_User("ADMIN"),
  Exams_controllers.Get_All_Exams
);

// Routes Handelar /API/Exams/Get
Router.route("/Get").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "STUDENT"),
  [body("Subject_Id").notEmpty().withMessage("Subject Id is Required")],
  Exams_controllers.Get_Subject_Exams
);

// Routes Handelar /API/Exams/Get
Router.route("/Get/:Exam_id").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "STUDENT"),
  [body("Subject_Id").notEmpty().withMessage("Subject Id is Required")],
  Exams_controllers.Get_Specific_Exam
);

// Routes Handelar /API/Exams/Add
Router.route("/Add").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is Required"),
    body("Title").notEmpty().withMessage("Title is Required"),
    body("instructor_id").notEmpty().withMessage("Instructor ID is Required"),
    body("ExamStart").notEmpty().withMessage("Exam Start Date is not Valid"),
    body("ExamEnd").notEmpty().withMessage("Exam End Data is not Valid"),
  ],
  Exams_controllers.Add_Exam
);

// Routes Handelar /API/Exams/AddQuestion
Router.route("/AddQuestion").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is Required"),
    body("_id").notEmpty().withMessage("Title is Required"),
    body("QuestionText").notEmpty().withMessage("Question Title is Required"),
    body("Options").notEmpty().withMessage("Options is not Valid"),
    body("correctAnswerIndex")
      .notEmpty()
      .withMessage("correct Answer not Valid"),
  ],
  Exams_controllers.Add_Exam_Question
);

// Routes Handelar /API/Exams/Remove
Router.route("/Remove").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
    body("_id").notEmpty().withMessage("Id is not Valid"),
  ],
  Exams_controllers.Remove_Exam
);

// Routes Handelar /API/Exams/Update
Router.route("/Update").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
    body("_id").notEmpty().withMessage("Id is not Valid"),
    body("Questions").notEmpty().withMessage("Questions is not Valid"),
    body("Shown").notEmpty().withMessage("Shown is not Valid"),
  ],
  Exams_controllers.Update_Exam
);

export default Router;
