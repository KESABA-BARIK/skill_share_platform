const Review = require("../models/review.model");
const User = require("../models/user.model");

exports.createReview = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const { reviewedUserId, rating, comment } = req.body;

    if (!reviewedUserId || !rating) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newReview = new Review({
      userId: reviewerId,
      reviewedUserId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Review creation failed:", err.message);
    console.error(err.stack);
    res.status(500).json({ message: "Failed to create review", error: err.message });
  }
}; 

exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ reviewedUserId: userId }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSkillReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ skillId: req.params.skillId });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
