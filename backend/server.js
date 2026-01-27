import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./APIs/UserAPI.js";
import cors from 'cors'

//create express app
const app = express();
//parse body of req
app.use(cors(['http://localhost:5173']))
app.use(express.json());
app.use("/user-api", userRouter);

//port number
const port = 4000;
//db connection
async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/vnrblog2026");
  console.log("DB connection success");
  //assign port number
  app.listen(port, () => console.log(`server listening on port ${port} `));
}

connectDB();

//test route (removed later)
app.get("/test", (req, res) => {
  res.json({ message: "From Test route" });
});
