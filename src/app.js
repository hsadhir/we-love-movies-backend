if (process.env.USER) require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { notFound, errorHandler } = require("./utils/errors");

const app = express();

const moviesRouter = require("./api/routers/movies");
const reviewsRouter = require("./api/routers/reviews");
const theatersRouter = require("./api/routers/theaters");

// Use cors for whole application
app.use(cors());
app.use(express.json());

// register routers
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// not found
app.use(notFound);
// generic error handler
app.use(errorHandler);

module.exports = app;
