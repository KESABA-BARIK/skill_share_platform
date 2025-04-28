import React, { useEffect, useState } from "react";
import axios from "axios";

const UserReviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${userId}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchReviews();
  }, [userId]);

  if (loading) return <p style={styles.message}>Loading reviews...</p>;
  if (reviews.length === 0) return <p style={styles.message}>No reviews yet.</p>;

  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>User Reviews</h4>
      <ul style={styles.list}>
        {reviews.map((review) => (
          <li key={review._id} style={styles.reviewItem}>
            <strong style={styles.reviewerName}>
              {review.reviewerName || "Anonymous"}
            </strong>: <span style={styles.comment}>{review.comment}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1a1a1a",
    color: "#f0f0f0",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 229, 255, 0.2)",
    marginTop: "1rem",
  },
  heading: {
    marginBottom: "1rem",
    color: "#00e5ff",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  reviewItem: {
    backgroundColor: "#2b2b2b",
    padding: "0.75rem",
    marginBottom: "0.75rem",
    borderRadius: "8px",
    transition: "transform 0.2s",
  },
  reviewerName: {
    color: "#ff4081",
  },
  comment: {
    color: "#e0e0e0",
  },
  message: {
    color: "#aaa",
    fontStyle: "italic",
  },
};

export default UserReviews;
