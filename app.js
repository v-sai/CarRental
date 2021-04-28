import dotenv from "dotenv";
dotenv.config();

import carRoute from "./Routes/cars.js";
import bookRoute from "./Routes/book.js";
import userRoute from "./Routes/user.js";
import statsRoute from "./Routes/stats.js";

import ejs from "ejs";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
const URI =
  "mongodb+srv://saiv5350:r161528sai@cluster0.mzusz.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const URI = "mongodb://localhost:27017/TravelAgency";
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("DB connected"));

//Routes for handling requests

app.use("/cars", carRoute);
app.use("/car", bookRoute);
app.use("/user", userRoute);
app.use("/stats", statsRoute);

//Error handlers
app.use((req, res, next) => {
  const error = new Error("Please check the URL you entered");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
//port
const PORT = process.env.PORT || 5000;
//app listen
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server started at port ${PORT}`)
);
