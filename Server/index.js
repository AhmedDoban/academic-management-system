// import files
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

import Student from "./App/Routes/Student.js";
import Parent from "./App/Routes/Parent.js";

// make a conection to data base
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log(`Connected to Server Successfully`));

// middlewares
const App = express();
App.use(express.json());
App.use(cors());

App.use("/API/Student", Student);
App.use("/API/Parent", Parent);
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
