const express = require("express");
require("express-async-errors");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const mongoose = require("mongoose");
require("./data/db");
const app = express();
const port = 3000;
app.use(express.json());
// app.use(express.urlencoded());

//! Routes
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

//? Global Error Handler
app.use((err, req, res, next) => {
  console.log("Error" + err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "internal server error",
    errors: err?.errors || [],
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
