// import files
import express from "express";
import { body } from "express-validator";
import Instractor_controllers from "../Controllers/Instractor_controllers.js";
import Verify_User from "./../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Instractor/Login
Router.route("/Login").post(
  [
    body("national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Instractor_controllers.Instractor_Login
);

// Routes Handelar /API/Instractor/Register
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
  Instractor_controllers.Instractor_Register
);

// Routes Handelar /API/Instractor/Instractor_id
Router.route("/:Instractor_id").post(
  JWT.Verify_Token,
  Verify_User("INSTRACTOR", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Token").notEmpty().withMessage("Token is not Valid"),
  ],
  Instractor_controllers.Get_Specific_Instractor
);

export default Router;
