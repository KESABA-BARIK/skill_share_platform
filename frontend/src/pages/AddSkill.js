import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddSkill.css"; // Import the new CSS

const AddSkill = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post("http://localhost:5000/api/skills", formData, config);

      alert("Skill added successfully!");
      navigate("/skills");
    } catch (err) {
      console.error("Error adding skill:", err);
      setError(
        err.response?.data?.message || "Failed to add skill. Please try again."
      );
    }
  };

  return (
    <div className="add-skill-container">
      <h2>Add New Skill</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="add-skill-form">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Skill Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
};

export default AddSkill;
