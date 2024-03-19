const mongoose = require("mongoose");
const { sendError } = require("../utils/helper");

//Connecting to the local mongoDB server


const DATA_BASE_NAME = process.env.DATA_BASE_NAME;
const DATA_BASE_PASSWORD = process.env.DATA_BASE_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${DATA_BASE_NAME}:${DATA_BASE_PASSWORD}@cluster0.dkrit2q.mongodb.net/test2`
  )
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log(err);
  });
