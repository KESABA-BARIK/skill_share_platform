// src/pages/SkillDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import './SkillDetail.css';


const SkillDetail = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchSkill = async () => {
      const res = await axios.get(`http://localhost:5000/api/skills/${id}`);
      setSkill(res.data);
    };

    const fetchReviews = async () => {
      const res = await axios.get(`http://localhost:5000/api/reviews/skill/${id}`);
      setReviews(res.data);
    };

    fetchSkill();
    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo?.token) return alert("You must be logged in to leave a review");
  
    try {
      const res = await axios.post(
        `http://localhost:5000/api/reviews`,
        {
          reviewedUserId: skill.userId,  // assuming skill.userId is the owner
          rating: 5, // You can later make this dynamic with a star input
          comment: newReview,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setReviews([...reviews, res.data]);
      setNewReview("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };
  

  if (!skill) return <p>Loading skill...</p>;

  return (
    <div className="container">
      <div className="card card-hover">
        <h2 className="title">{skill.title}</h2>
        <p className="description">{skill.description}</p>
        <p className="skill-meta"><strong>Category:</strong> {skill.category}</p>
        
      </div>
  
      <div className="review-section">
        <h3>Reviews</h3>
        <ul className="review-list">
          {reviews.map((r, i) => (
            <li key={i} className="review-item">
              <strong>{r.reviewerName || "Anonymous"}:</strong> {r.comment}
            </li>
          ))}
        </ul>
  
        {userInfo && (
          <form onSubmit={handleSubmit} className="review-form">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Leave a review..."
              className="textarea"
              required
            />
            <button type="submit" className="button">Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );  
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1.5rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  card: {
    padding: "1rem",
    borderBottom: "1px solid #ddd",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
  },
  reviewSection: {
    paddingTop: "1rem",
  },
  reviewList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "1.5rem",
  },
  reviewItem: {
    padding: "0.5rem",
    borderBottom: "1px solid #ccc",
  },
  reviewForm: {
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    resize: "vertical",
    minHeight: "80px",
    padding: "0.8rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    alignSelf: "flex-start",
    padding: "0.5rem 1.2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default SkillDetail;
