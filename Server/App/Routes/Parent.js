// import files
import express from "express";
import { body } from "express-validator";
import Parent_controllers from "../Controllers/Parent_controllers.js";
import Verify_User from "./../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Parent/Login
Router.route("/Login").post(
  [
    body("national_ID")
      .matches(/^[\d+]{14}$/)
      .withMessage("national ID is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Parent_controllers.Parent_Login
);

// Routes Handelar /API/Parent/Register
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
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Parent_controllers.Parent_Register
);

// Routes Handelar /API/Student/Parent_id
Router.route("/:Parent_id").post(
  JWT.Verify_Token,
  Verify_User("PARENT", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Token").notEmpty().withMessage("Token is not Valid"),
  ],
  Parent_controllers.Get_Specific_Parent
);

export default Router;
