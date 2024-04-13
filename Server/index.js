// import files
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import Student from "./App/Routes/Student.js";
import Parent from "./App/Routes/Parent.js";
import Instructor from "./App/Routes/Instructor.js";
import Subjects from "./App/Routes/Subjects.js";
import Semester from "./App/Routes/Semester.js";
import Inquiries from "./App/Routes/Inquiries.js";
import Videos from "./App/Routes/Videos.js";
import Summary from "./App/Routes/Summary.js";
import Exams from "./App/Routes/Exams.js";
import Notes from "./App/Routes/Notes.js";
import Todos from "./App/Routes/Todos.js";
import Chats from "./App/Routes/Chats.js";

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
App.use("/API/Summary", Summary);
App.use("/API/Exams", Exams);
App.use("/API/Notes", Notes);
App.use("/API/Todos", Todos);
App.use("/API/Chats", Chats);
App.use("*", (Req, Res) => {
  Res.status(200).json({
    Status: "Faild",
    message: "Can't access this Route. ",
  });
});

// socket chat implementation
const AppServer = http.createServer(App);

const io = new Server(AppServer, {
  cors: {
    origin: process.env.CLIENT_URI,
  },
});

io.on("connection", (socket) => {
  socket.on("online_Chat", (data) => {
    socket.join(data.Subject_id);
  });
  socket.on("Send_Message", (data) => {
    socket.to(data.Subject_Id).emit("Recive_Message", data);
  });
  socket.on("Typing", (subject) => {
    socket.to(subject).emit("Show_Typing_Status");
  });
  socket.on("StopTyping", (subject) => {
    socket.to(subject).emit("Hide_Typing_Status");
  });
});

// Server
AppServer.listen(3001, () => {
  console.log("Listen in port 3001");
});
