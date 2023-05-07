const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
