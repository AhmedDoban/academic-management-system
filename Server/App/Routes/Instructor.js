// import files
import express from "express";
import { body } from "express-validator";
import Instructor_controllers from "../Controllers/Instructor_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";
import upload_Avatar from './../Multer/Avatars.js';

const Router = express.Router();

// Routes Handelar /API/Instructor/Login
Router.route("/Login").post(
  [
    body("national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Instructor_controllers.Instructor_Login
);

// Routes Handelar /API/Instructor/Register
Router.route("/Register").post(
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("Mobile").notEmpty().withMessage("Mobile is Required"),
    body("email")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
      .withMessage("Email is not Valid"),
    body("national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Instructor_controllers.Instructor_Register
);

// Routes Handelar /API/Instructor/Password
Router.route("/Password").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Token").notEmpty().withMessage("Name is Required"),
    body("_id").notEmpty().withMessage("Mobile is Required"),
    body("OldPassword")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
    body("NewPassword")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Instructor_controllers.Change_Instructor_Password
);

// Routes Handelar /API/Instructor/Setting
Router.route("/Setting").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Token").notEmpty().withMessage("Name is Required"),
    body("_id").notEmpty().withMessage("Mobile is Required"),
    body("Mobile").notEmpty().withMessage("Mobile is Required"),
    body("Location").notEmpty().withMessage("Mobile is Required"),
  ],
  Instructor_controllers.Change_Instructor_Setting
);

// Routes Handelar /API/Instructor/UpdataAvatar
Router.route("/UpdataAvatar").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    upload_Avatar.single("Avatar"),
    body("Token").notEmpty().withMessage("Name is Required"),
    body("_id").notEmpty().withMessage("Mobile is Required"),
  ],
  Instructor_controllers.Change_Instructor_Avatar
);

// Routes Handelar /API/Instructor/Instructor_id
Router.route("/:Instructor_id").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Token").notEmpty().withMessage("Token is not Valid"),
  ],
  Instructor_controllers.Get_Specific_Instructor
);

export default Router;
