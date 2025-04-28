const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    reviewedUserId: { type: Number, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
