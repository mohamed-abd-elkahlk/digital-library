const express = require("express");

// const {
//   createReviewValidator,
//   updateReviewValidator,
//   getReviewValidator,
//   deleteReviewValidator,
// } = require("../utils/validation/review.validateion");

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require("../services/review.service");

const authService = require("../services/auth.service");

const router = express.Router({ mergeParams: true });

router.route("/").get(createFilterObj, getReviews).post(
  //chked
  authService.protect,
  authService.allowedTo("user"),
  setProductIdAndUserIdToBody,
  createReview
); //chked
router
  .route("/:id")
  .get(getReview) //chked
  .put(authService.protect, authService.allowedTo("user"), updateReview) //chked
  .delete(
    authService.protect,
    authService.allowedTo("user", "manager", "admin"),
    deleteReview
  ); //chked

module.exports = router;
