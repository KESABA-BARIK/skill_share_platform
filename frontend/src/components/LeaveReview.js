// components/LeaveReview.js
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const LeaveReview = ({ reviewedUserId }) => {
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Please write a comment");

    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          reviewedUserId,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      alert("Review submitted!");
      setComment("");
    } catch (err) {
      console.error("Review submission failed:", err);
      alert("Failed to leave review.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default LeaveReview;
