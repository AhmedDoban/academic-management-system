// import files
import express from "express";
import { body } from "express-validator";
import Admin_controllers from "../Controllers/Admin_controllers.js";
import Verify_User from "./../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";
import upload_Avatar from "../Multer/Avatars.js";

const Router = express.Router();

// Routes Handelar /API/Admin/Login
Router.route("/Login").post(
  [
    body("national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Admin_controllers.Admin_Login
);

// Routes Handelar /API/Admin/Register
Router.route("/Register").post(
  JWT.Verify_Token,
  Verify_User("ADMIN"),
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
  Admin_controllers.Admin_Register
);

// Routes Handelar /API/Admin/Admint_id
Router.route("/:Admin_id").post(
  JWT.Verify_Token,
  Verify_User("ADMIN"),
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Token").notEmpty().withMessage("Token is not Valid"),
  ],
  Admin_controllers.Get_Specific_Admin
);

export default Router;
