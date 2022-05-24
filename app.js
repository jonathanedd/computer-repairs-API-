const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// controller
const { globalErrorHandler } = require("./controllers/error.controller");

//Routers
const { userRouter } = require("./routes/users.routes");
const { repairRouter } = require("./routes/repairs.routes");

//Initialize express app
const app = express();

app.use(cors());

//enable incoming JSON data
app.use(express.json());

// Limit IP request
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000,
  message: "Too many requests from this IP",
});

app.use(limiter);
app.use(helmet());
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else app.use(morgan("combined"));

// URL : http://localhost:4001/api/v2/users
app.use("/api/v2/users", userRouter);

//URL : http://localhost:4001/api/v2/repairs
app.use("/api/v2/repairs", repairRouter);

app.use("*", globalErrorHandler);

module.exports = { app };
