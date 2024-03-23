// import files
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

// make a conection to data base
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log(`Connected to Server Successfully`));

// middlewares
const App = express();
App.use(express.json());
App.use(cors());

// Server
App.listen(3001, () => {
  console.log("Listen in port 3000");
});
