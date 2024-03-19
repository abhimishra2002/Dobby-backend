const morgan = require("morgan");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path')

const { errorHandler } = require("./middlewares/error");
const { notFoundHandler } = require("./utils/helper");
const userRouter = require("./routes/user.js");
const imageRouter = require("./routes/images.js");

require("./db");

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());


app.use("/api/user", userRouter);

app.use("/api/image", imageRouter);

app.use("/api/*", notFoundHandler);

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("the port is listening on port" + PORT);
});
