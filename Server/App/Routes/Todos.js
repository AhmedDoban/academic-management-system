// import files
import express from "express";
import { body } from "express-validator";
import Todo_controllers from "../Controllers/Todo_controllers.js";
import Verify_User from "../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Todos
Router.route("/").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "ADMIN"),

  [
    body("Student_ID").notEmpty().withMessage("Student _id is Required"),
    body("Token").notEmpty().withMessage("Token is Required"),
  ],
  Todo_controllers.Get_All_Todos
);

// Routes Handelar /API/Todos/Update
Router.route("/Update").post(
  JWT.Verify_Token,
  Verify_User("STUDENT", "ADMIN"),
  [
    body("Student_ID").notEmpty().withMessage("Student _id is Required"),
    body("Token").notEmpty().withMessage("Token is Required"),
    body("Todos").withMessage("Todos is not Valid"),
  ],
  Todo_controllers.Update_Todos
);

export default Router;
