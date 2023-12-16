const express = require("express");
const controller = require("../controllers/reviews");
const { methodNotAllowed } = require("../../utils/errors");

const router = express.Router();

router.route("/:reviewId").put(controller.updateReview).delete(controller.deleteReview).all(methodNotAllowed);

module.exports = router;
