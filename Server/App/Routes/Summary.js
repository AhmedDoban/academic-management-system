// import files
import express from "express";
import { body } from "express-validator";
import Summary_controllers from "../Controllers/Summary_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";
import upload_Summary from "../Multer/Summary.js";

const Router = express.Router();

// Routes Handelar /API/Summary
Router.route("/").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "INSTRUCTOR"),
  [body("Subject_Id").notEmpty().withMessage("Subject ID is not Valid")],
  Summary_controllers.Get_All_Summary
);

// Routes Handelar /API/Summary/Add
Router.route("/Add").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    upload_Summary.single("PDF"),
    body("Title").notEmpty().withMessage("Title is Required"),
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
  ],
  Summary_controllers.Add_Summary
);

// Routes Handelar /API/Summary/Remove
Router.route("/Remove").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
    body("_id").notEmpty().withMessage("Id is not Valid"),
  ],
  Summary_controllers.Remove_Summary
);

// Routes Handelar /API/Summary/Update
Router.route("/Update").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("Id is not Valid"),
    body("Subject_Id").notEmpty().withMessage("Subject_Id is Required"),
    body("Title").notEmpty().withMessage("Title is Required"),
  ],
  Summary_controllers.Update_Summary
);

// Routes Handelar /API/Summary/Update/Shown
Router.route("/Update/Shown").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("Id is not Valid"),
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
  ],
  Summary_controllers.Update_Summary_Shown
);

export default Router;
