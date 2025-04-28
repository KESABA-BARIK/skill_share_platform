import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./EditSkill.css";

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/skills/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        console.error("Failed to fetch skill:", err);
        alert("Could not load skill info.");
      }
    };

    fetchSkill();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/skills/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      alert("Skill updated!");
      navigate("/skills");
    } catch (err) {
      console.error("Failed to update skill:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-heading">Edit Skill</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label className="edit-label">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="edit-input"
        />

        <label className="edit-label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="edit-textarea"
        />

        <button type="submit" className="edit-button">Update Skill</button>
      </form>
    </div>
  );
};

export default EditSkill;
