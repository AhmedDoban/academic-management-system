// import files
import express from "express";
import { body } from "express-validator";
import Semester_controllers from "../Controllers/Semester_controllers.js";
import Verify_User from "./../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Semester/Register
Router.route("/Register").post(
  JWT.Verify_Token,
  Verify_User("STUDENT"),
  [
    body("Student_ID").notEmpty().withMessage("Student ID is Required"),
    body("Student_national_id")
      .notEmpty()
      .withMessage("Student national id is Required"),
    body("Subjects").notEmpty().withMessage("Subjects is not Valid"),
    body("Semester_Hours").notEmpty().withMessage("national ID is not Valid"),
  ],
  Semester_controllers.Semester_Register_Subjects
);

Router.route("/StudentSemester").post(
  JWT.Verify_Token,
  Verify_User("STUDENT"),
  [
    body("_id").notEmpty().withMessage("ID is Required"),
    body("Token").notEmpty().withMessage("Token is Required"),
    body("Student_national_id")
      .notEmpty()
      .withMessage("Student national id is not Valid"),
  ],
  Semester_controllers.Get_All_Semester
);

Router.route("/StudentSemesterSubjects").post(
  JWT.Verify_Token,
  Verify_User("STUDENT"),
  [
    body("Student_ID").notEmpty().withMessage("Student ID is Required"),
    body("Semester_id").notEmpty().withMessage("Semester id is Required"),
  ],
  Semester_controllers.Get_Semester_Subjects
);

export default Router;
