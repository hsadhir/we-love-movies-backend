const express = require("express");
const controller = require("../controllers/movies");
const { methodNotAllowed } = require("../../utils/errors");
const movieRouter = require("./movie");

const router = express.Router();

router.route("/").get(controller.getAllMovies).all(methodNotAllowed);

router.use("/:movieId", movieRouter);

module.exports = router;
