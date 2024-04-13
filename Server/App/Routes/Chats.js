// import files
import express from "express";
import { body } from "express-validator";
import Chats_controllers from "../Controllers/Chats_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Chats
Router.route("/").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "STUDENT"),
  [body("Subject_Id").notEmpty().withMessage("Subject Id is Required")],
  Chats_controllers.Get_All_Messages
);

// Routes Handelar /API/Chats/Add
Router.route("/Add").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR", "STUDENT"),
  [
    body("Subject_Id").notEmpty().withMessage("Subject Id is Required"),
    body("Message").notEmpty().withMessage("Message is Required"),
    body("User_Avatar").notEmpty().withMessage("Avatar Id is Required"),
    body("User_Id").notEmpty().withMessage("User Id is Required"),
    body("User_Name").notEmpty().withMessage("Name is Required"),
  ],
  Chats_controllers.Add_Message
);

export default Router;
