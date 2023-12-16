const express = require("express");
const controller = require("../controllers/movies");
const { methodNotAllowed } = require("../../utils/errors");

const router = express.Router({ mergeParams: true });

router.route("/").get(controller.getMovieById).all(methodNotAllowed);

router
  .route("/theaters")
  .get(controller.getTheatersForMovie)
  .all(methodNotAllowed);

router
  .route("/reviews")
  .get(controller.getReviewsForMovie)
  .all(methodNotAllowed);

module.exports = router;
