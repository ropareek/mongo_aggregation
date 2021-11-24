const express = require("express");

const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const aboutRoute = require("./route/aboutRoute");

require("dotenv").config();

// DB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/logs", (err) => {
  if (err) throw new Error(err);
  console.log("Db connected");
});

app.use(aboutRoute);

// SERVER
app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
