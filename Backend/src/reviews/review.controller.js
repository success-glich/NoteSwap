const reviewService = require("./index");
const ReviewController = {
  createReview: async (req, res) => {
    const user = req.user;
    const rating = {
      ...req.body,
      user,
    };
    //do some business
    try {
      const review = await reviewService.insertReview(rating);
      return res.status(200).json({
        message: "Review Posted Successfully",
        review: review,
      });
    } catch (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
  },
  getReview: async (req, res) => {
    try {
      // do some logic
      const review = await reviewService.getReviews();
      return res.status(200).json({
        message: "Review found",
        review,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
};
module.exports = ReviewController;
