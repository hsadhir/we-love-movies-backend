const db = require("../../db/connection");

// =========movies================
/*
 * SQL Query:
 *   when is_showing is not passed: `SELECT * FROM movies`
 *   when is_showing is true: `SELECT m.* FROM movies AS m JOIN movies_theaters AS  mt ON m.movie_id=mt.movie_id WHERE mt.is_showing=true GROUP BY m.movie_id`;
 *   when is_showing is false: `SELECT m.* FROM movies AS m JOIN movies_theaters AS  mt ON m.movie_id=mt.movie_id WHERE mt.is_showing=false GROUP BY m.movie_id`;
 */
async function getListOfMovies(is_showing) {
  try {
    if (is_showing === undefined) {
      return db("movies as m").select(
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url"
      );
    } else {
      return db("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select(
          "m.movie_id",
          "m.title",
          "m.runtime_in_minutes",
          "m.rating",
          "m.description",
          "m.image_url"
        )
        .where({ "mt.is_showing": is_showing === "true" ? true : false })
        .groupBy("m.movie_id");
    }
  } catch (error) {
    console.error("Error in getListOfMovies:", error);
    throw error;
  }
}

/*
 * SQL Query:
 *   SELECT * FROM movies WHERE movie_id=1;
 */
async function getMovieById(movie_id) {
  try {
    return db("movies as m")
      .select("m.*")
      .where({ "m.movie_id": movie_id })
      .first();
  } catch (error) {
    console.error("Error in getMovie:", error);
    throw error;
  }
}

/*
 * SQL Query: 
    SELECT t.*,mt.is_showing,m.movie_id 
    FROM movies AS m 
        JOIN movies_theaters as mt ON m.movie_id=mt.movie_id 
        JOIN theaters as t ON mt.theater_id=t.theater_id 
    WHERE m.movie_id=1 AND mt.is_showing=true;
 */
async function getTheatersForMovie(movie_id) {
  try {
    return db("movies as m")
      .select("t.*", "mt.is_showing", "m.movie_id")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .join("theaters as t", "mt.theater_id", "t.theater_id")
      .where({ "m.movie_id": movie_id, "mt.is_showing": true });
  } catch (error) {
    console.error("Error in getTheatersForMovie:", error);
    throw error;
  }
}

/*
 * SQL Query:
      SELECT reviews.*, critics.*
      FROM movies
      JOIN reviews ON movies.movie_id = reviews.movie_id
      JOIN critics ON reviews.critic_id = critics.critic_id
      WHERE movies.movie_id = 1;
 */
async function getReviewsForMovie(movie_id) {
  try {
    return db("movies as m")
      .select(
        "r.*",
        "c.critic_id",
        "c.preferred_name",
        "c.surname",
        "c.organization_name",
        "c.created_at as critic_created_at",
        "c.updated_at as critic_updated_at"
      )
      .join("reviews as r", "m.movie_id", "r.movie_id")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .where({ "m.movie_id": movie_id });
  } catch (error) {
    console.error("Error in getReviewsForMovie:", error);
    throw error;
  }
}

module.exports = {
  getListOfMovies,
  getMovieById,
  getTheatersForMovie,
  getReviewsForMovie,
};
