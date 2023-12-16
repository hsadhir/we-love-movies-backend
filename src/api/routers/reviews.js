const express = require("express");
const controller = require("../controllers/reviews");
const { methodNotAllowed } = require("../../utils/errors");

const router = express.Router({ mergeParams: true });

router.route("/").get(controller.getReviews).all(methodNotAllowed);

router
  .route("/:reviewId")
  .put(controller.updateReview)
  .delete(controller.deleteReview)
  .all(methodNotAllowed);

module.exports = router;
