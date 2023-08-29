const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./power-pulse-api-docs.json');

const dashRouter = require("./routes/api/dashboard");
const usersRouter = require("./routes/api/auth");

const exercisesRouter = require("./routes/api/exercises");
const productsRouter = require("./routes/api/products");
const diaryRouter = require("./routes/api/diary");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/dashboard", dashRouter);
app.use("/api/users", usersRouter);

app.use("/api/exercises", exercisesRouter);
app.use("/api/products", productsRouter);
app.use("/api/diaries", diaryRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Service not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
