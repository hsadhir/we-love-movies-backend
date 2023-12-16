const db = require("../../db/connection");

/*
 * SQL Query: SELECT * FROM REVIEWS WHERE REVIEW_ID=<REVIEW_ID>;
 */
async function getReviewById(review_id) {
  return db("reviews").select("*").where({ review_id: review_id }).first();
}

/*
 * SQL Query: SELECT * FROM CRITICS WHERE CRITIC_ID=<CRITIC_ID>;
 */
async function getCriticById(critic_id) {
  return db("critics").select("*").where({ critic_id: critic_id }).first();
}

async function addCriticProperyToReview(review) {
  review.critic = await getCriticById(review.critic_id);
  return review;
}

/*
  SQL Query:
    UPDATE reviews
    SET column1 = value1, column2 = value2, ...
    WHERE review_id = :review_id
    RETURNING *;
*/
async function updateReview(review) {
  return db("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => getReviewById(review.review_id))
    .then(addCriticProperyToReview);
}

/* SQL Query:
    DELETE FROM reviews
    WHERE review_id = :review_id;
*/
async function deleteReviewById(review_id) {
  return db("reviews").where({ review_id: review_id }).del();
}

module.exports = {
  getReviewById,
  updateReview,
  deleteReviewById,
};
