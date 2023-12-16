const service = require("../services/movies");
const { asyncErrorBoundary } = require("../../utils/errors");

// Middleware to check if a movie exists
async function movieExists(req, res, next) {
  if (req.originalUrl === "/theaters" || req.originalUrl === '/reviews') {
    next();
  } else {
    const { movieId } = req.params;
    try {
      const movie = await service.getMovieById(movieId);
      if (!movie) {
        return next({ status: 404, message: "Movie cannot be found." });
      }
      // Attach the movie object to the res.locals for later use in the route handlers
      res.locals.movie = movie;
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

// GET /movies/:movieId
async function getMovieById(req, res) {
  const {
    locals: { movie },
  } = res; // Access the movie object from the res.locals
  res.json({ data: movie });
}

// GET /movies/:movieId/theaters
async function getTheatersForMovie(req, res) {
  const {
    locals: { movie },
  } = res; // Access the movie object from the res.locals
  try {
    const theaters = await service.getTheatersForMovie(movie.movie_id);
    res.json({ data: theaters });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// GET /movies/:movieId/reviews
async function getReviewsForMovie(req, res) {
  const {
    locals: { movie },
  } = res; // Access the movie object from the res.locals
  try {
    const reviews = await service.getReviewsForMovie(movie.movie_id);
    const reviewsMapped = reviews.map(
      ({
        preferred_name,
        surname,
        organization_name,
        critic_created_at,
        critic_updated_at,
        ...review
      }) => {
        return {
          ...review,
          critic: {
            critic_id: review.critic_id,
            preferred_name,
            surname,
            organization_name,
            created_at: critic_created_at,
            updated_at: critic_updated_at,
          },
        };
      }
    );
    res.json({ data: reviewsMapped });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// GET /movies
async function getAllMovies(req, res) {
  const { is_showing } = req.query;
  try {
    const movies = await service.getListOfMovies(is_showing);
    res.json({ data: movies });
  } catch (error) {
    console.error(error);
    next();
  }
}

module.exports = {
  movieExists,
  getTheatersForMovie,
  getReviewsForMovie,
  getMovieById: [asyncErrorBoundary(movieExists), getMovieById],
  getAllMovies: asyncErrorBoundary(getAllMovies),
};
