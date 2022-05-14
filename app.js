const express = require("express");

// controller
const { globalErrorHandler } = require("./controllers/error.controller");

//Routers
const { userRouter } = require("./routes/users.routes");
const { repairRouter } = require("./routes/repairs.routes");

//Initialize express app
const app = express();

//enable incoming JSON data
app.use(express.json());

// URL : http://localhost:4001/api/v2/users
app.use("/api/v2/users", userRouter);

//URL : http://localhost:4001/api/v2/repairs
app.use("/api/v2/repairs", repairRouter);

app.use("*", globalErrorHandler);

module.exports = { app };
