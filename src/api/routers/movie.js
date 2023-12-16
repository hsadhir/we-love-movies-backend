const express = require("express");
const controller = require("../controllers/movies");
const theatersRouter = require("./theaters"); // Import the theaters router
const reviewsRouter = require("./reviews");
const { methodNotAllowed } = require("../../utils/errors");

const router = express.Router({ mergeParams: true });

router.route("/").get(controller.getMovieById).all(methodNotAllowed);

// Delegate handling of /theaters routes to theatersRouter
router.use('/theaters', theatersRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
