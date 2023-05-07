const Review = require("./reveiw");
const ReviewService = require("./review.service");
const reviewService = new ReviewService(Review);

module.exports = reviewService;
