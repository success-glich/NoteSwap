const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notesSchema = new Schema(
  {
    title: {
      type: String,
      require: "Title is required",
    },
    description: {
      type: String,
      require: "Description should be provided",
    },
    imgUrl: {
      type: String,
      require: "Cover Img url is required",
    },
    fileUrl: {
      type: String,
      require: "file is required",
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    noteStatus: {
      type: String,
      default: "reviewing",
    },
  },
  { timestamps: true }
);
const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
