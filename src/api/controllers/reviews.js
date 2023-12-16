const service = require("../services/reviews");
const { asyncErrorBoundary, methodNotAllowed } = require("../../utils/errors");

const { movieExists, getReviewsForMovie } = require("./movies");

async function getReviews(req, res, next) {
  const { movieId } = req.params;

  if (movieId) {
    getReviewsForMovie(req, res);
  } else {
    methodNotAllowed(req, res, next);
  }
}

// Middleware to check if a review exists
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  try {
    const review = await service.getReviewById(reviewId);
    if (!review) {
      return next({ status: 404, message: "Review cannot be found." });
    }
    // Attach the movie object to the res.locals for later use in the route handlers
    res.locals.review = review;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// PUT /reviews/:reviewId
async function updateReview(req, res) {
  const review = res.locals.review;
  const updatedReview = {
    ...review,
    ...req.body.data,
    review_id: review.review_id,
  };
  const data = await service.updateReview(updatedReview);
  res.json({ data: data });
}

// DELETE /reviews/:reviewId
async function deleteReview(req, res) {
  const review = res.locals.review;
  await service.deleteReviewById(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  getReviews: [asyncErrorBoundary(movieExists), getReviews],
  updateReview: [asyncErrorBoundary(reviewExists), updateReview],
  deleteReview: [asyncErrorBoundary(reviewExists), deleteReview],
};
