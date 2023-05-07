const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  name: {
    type: String,
    required: "Name is requried",
  },
  rating: {
    type: Number,
    required: "Rating is required",
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Notes",
    required: "Notes id is required",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Review = mongoose.model("Reviews", reviewSchema);
module.exports = Review;
