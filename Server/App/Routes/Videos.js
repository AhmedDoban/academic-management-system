// import files
import express from "express";
import { body } from "express-validator";
import Videos_controllers from "../Controllers/Videos_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";
import upload_Video from "../Multer/Videos.js";

const Router = express.Router();

// Routes Handelar /API/Videos
Router.route("/").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "INSTRUCTOR"),
  [body("Subject_Id").notEmpty().withMessage("Subject ID is not Valid")],
  Videos_controllers.Get_All_Videos
);

// Routes Handelar /API/Videos/Add
Router.route("/Add").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    upload_Video.single("Video"),
    body("Title").notEmpty().withMessage("Student ID is Required"),
    body("Description").notEmpty().withMessage("Student ID is Required"),
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
  ],
  Videos_controllers.Add_Videos
);

// Routes Handelar /API/Videos/Remove
Router.route("/Remove").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
    body("_id").notEmpty().withMessage("Id is not Valid"),
  ],
  Videos_controllers.Remove_Videos
);

// Routes Handelar /API/Videos/Update
Router.route("/Update").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("Id is not Valid"),
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
    body("Description").notEmpty().withMessage("Student ID is Required"),
    body("Title").notEmpty().withMessage("Student ID is Required"),
  ],
  Videos_controllers.Update_Videos
);

// Routes Handelar /API/Videos/Update/Shown
Router.route("/Update/Shown").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "ADMIN"),
  [
    body("_id").notEmpty().withMessage("Id is not Valid"),
    body("Subject_Id").notEmpty().withMessage("Subject Id is not Valid"),
  ],
  Videos_controllers.Update_Videos_Shown
);

export default Router;
