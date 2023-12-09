import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// import Routes here
import authRoute from "./routes/auth.js";
import passwordRoute from "./routes/password.js";

dotenv.config();
const app = express();
const port=process.env.PORT || 3000;
const api = process.env.API_URI;

const connect = () => {
  mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
};

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// add routes here
app.get(`${api}/hello`, (req, res) => {
  console.log("hello")
  res.status(200).send({message:"hello world"});
})
app.use(`${api}/auth`, authRoute);
app.use(`${api}/password`, passwordRoute);


connect();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

