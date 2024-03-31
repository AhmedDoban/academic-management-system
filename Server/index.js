// import files
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

import Student from "./App/Routes/Student.js";
import Parent from "./App/Routes/Parent.js";
import Instructor from "./App/Routes/Instructor.js";
import Subjects from "./App/Routes/Subjects.js";
import Semester from "./App/Routes/Semester.js";
import Inquiries from "./App/Routes/Inquiries.js";
import Videos from "./App/Routes/Videos.js";

// File System
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// make a conection to data base
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log(`Connected to Server Successfully`));

// middlewares
const App = express();
App.use(express.json());
App.use(cors());

App.use("/Uploads", express.static(path.join(__dirname, "/Uploads")));
App.use("/API/Student", Student);
App.use("/API/Parent", Parent);
App.use("/API/Instructor", Instructor);
App.use("/API/Subjects", Subjects);
App.use("/API/Semester", Semester);
App.use("/API/Inquiries", Inquiries);
App.use("/API/Videos", Videos);
App.use("*", (Req, Res) => {
  Res.status(200).json({
    Status: "Faild",
    message: "Can't access this Route. ",
  });
});

// Server
App.listen(3001, () => {
  console.log("Listen in port 3001");
});
