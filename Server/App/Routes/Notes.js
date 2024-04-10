// import files
import express from "express";
import { body } from "express-validator";
import Notes_controllers from "../Controllers/Notes_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Notes
Router.route("/").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "ADMIN"),

  [
    body("Student_ID").notEmpty().withMessage("Student _id is Required"),
    body("Token").notEmpty().withMessage("Token is Required"),
  ],
  Notes_controllers.Get_All_Notes
);

// Routes Handelar /API/Notes/Update
Router.route("/Update").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "ADMIN"),
  [
    body("Student_ID").notEmpty().withMessage("Student _id is Required"),
    body("Token").notEmpty().withMessage("Token is Required"),
    body("Notes").withMessage("Notes is not Valid"),
  ],
  Notes_controllers.Update_Notes
);

export default Router;
