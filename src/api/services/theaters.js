const db = require("../../db/connection");

// ====theaters

async function getAllTheaters() {
  try {
    return db("theaters as t")
      .select("t.*", "m.*")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .join("movies as m", "mt.movie_id", "m.movie_id");
  } catch (error) {
    console.error("Error in getTheatersForMovie:", error);
    throw error;
  }
}

module.exports = {
  getAllTheaters,
};
