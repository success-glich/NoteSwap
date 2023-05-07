class ReviewService {
  Review;
  constructor(Review) {
    this.Review = Review;
  }
  async insertReview(rating) {
    try {
      const addedReview = await new this.Review(rating).save();

      return addedReview;
      // return addedReview;
    } catch (err) {
      throw err;
    }
  }
  async getReviews() {
    try {
      const getReviews = await this.Review.find({})
        .populate({
          path: "user",
          select: "-password -__v",
        })
        .populate("note");
      return getReviews;
    } catch (err) {
      throw err;
    }
  }
  async getReviewByNoteId(id) {
    try {
      const getReviews = await this.Review.find({})
        .populate({
          path: "user",
          select: "-password -__v",
        })
        .populate("note");
      return getReviews;
    } catch (err) {
      th;
    }
  }
}
module.exports = ReviewService;
