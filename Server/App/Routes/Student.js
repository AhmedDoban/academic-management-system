// import files
import express from "express";
import { body } from "express-validator";
import Student_controllers from "../Controllers/Student_controllers.js";
import Verify_User from "./../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Student/Login
Router.route("/Login").post(
  [
    body("national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Student_controllers.Studetn_Login
);

// Routes Handelar /API/Student/Register
Router.route("/Register").post(
  [
    body("name").notEmpty().withMessage("First Name is Required"),
    body("Mobile").notEmpty().withMessage("Last Name is Required"),
    body("email")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
      .withMessage("Email is not Valid"),
    body("national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("parent_national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Student_controllers.Studetn_Register
);

// Routes Handelar /API/Student/Student_id
Router.route("/:Student_id").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Token").notEmpty().withMessage("Token is not Valid"),
  ],
  Student_controllers.Get_Specific_Student
);

export default Router;
