const { verifyUser } = require("../auth/auth.middleware");
const ReviewController = require("./review.controller");
const reviewRoutes = require("express").Router();

reviewRoutes.post("/", verifyUser, ReviewController.createReview);
reviewRoutes.get("/", ReviewController.getReview);
// reviewRoutes.get("/id");
module.exports = reviewRoutes;
