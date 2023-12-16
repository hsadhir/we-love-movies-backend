const service = require("../services/theaters");
const { asyncErrorBoundary } = require("../../utils/errors");
const reduceProperties = require("../../utils/reduce-properties");

const { movieExists, getTheatersForMovie } = require("./movies");

async function getAllTheaters(req, res, next) {
  const { movieId } = req.params;

  if (movieId) {
    getTheatersForMovie(req, res);
  } else {
    // If movieId is falsy, proceed to get all theaters without calling movieExists
    const reduceMovies = reduceProperties("theater_id", {
      movie_id: ["movies", null, "movie_id"],
      title: ["movies", null, "title"],
      rating: ["movies", null, "rating"],
      runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
      description: ["movies", null, "description"],
      image_url: ["movies", null, "image_url"],
    });

    try {
      const theaters = await service.getAllTheaters();
      res.json({ data: reduceMovies(theaters) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = {
  getAllTheaters: [asyncErrorBoundary(movieExists), getAllTheaters],
};
