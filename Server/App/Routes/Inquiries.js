// import files
import express from "express";
import { body } from "express-validator";
import Inquiries_controllers from "../Controllers/Inquiries_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Inquiries
Router.route("/").post(
  JWT.Verify_Token,
  [body("Subject_Id").notEmpty().withMessage("Subject ID is not Valid")],
  Inquiries_controllers.Get_All_Inquiries
);

// Routes Handelar /API/Inquiries/Add
Router.route("/Add").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "ADMIN"),
  [
    body("Question").notEmpty().withMessage("Question is Required"),
    body("Student_ID").notEmpty().withMessage("Student ID is Required"),
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
  ],
  Inquiries_controllers.Add_Inquiries
);

// Routes Handelar /API/Inquiries/Inquiries_id
Router.route("/Remove").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
    body("_id").notEmpty().withMessage("Id is not Valid"),
  ],
  Inquiries_controllers.Remove_Inquiries
);

// Routes Handelar /API/Inquiries/Update
Router.route("/Update").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
    body("_id").notEmpty().withMessage("Id is not Valid"),
    body("Answer").notEmpty().withMessage("Answer is not Valid"),
  ],
  Inquiries_controllers.Update_Inquiries
);

export default Router;
