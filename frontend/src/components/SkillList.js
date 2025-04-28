import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../redux/actions/skillActions";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./SkillList.css";

const SkillList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { skills, loading, error } = useSelector((state) => state.skill);
  const { userInfo } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleAddSkill = () => {
    navigate("/add-skill");
  };

  const handleEdit = (id) => {
    navigate(`/edit-skill/${id}`);
  };

  const handleDelete = async (id) => {
    if (!userInfo?.token) return alert("Unauthorized");
    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch(fetchSkills());
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Delete failed");
    }
  };

  const handleBooking = async (skillId) => {
    const message = prompt("Enter a message for the skill owner:");
    if (!message) return;
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { skillId, message },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      alert("Booking request sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send booking request");
    }
  };

  const userId = Number(userInfo?.user?.id);

  const filterAndSort = (skillArray) => {
    const filtered = skillArray.filter(
      (s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });
  };

  const userSkills = filterAndSort(skills.filter((s) => s.userId === userId));
  const otherSkills = filterAndSort(skills.filter((s) => s.userId !== userId));

  return (
    <div className="skilllist-container">
      <h2 className="skilllist-heading">Skill Exchange Board</h2>
      <button onClick={handleAddSkill} className="btn-add">Add New Skill</button>

      <div className="skilllist-controls">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="title-asc">A-Z</option>
          <option value="title-desc">Z-A</option>
        </select>
      </div>

      {loading && <p>Loading skills...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="skilllist-columns">
        <div className="skilllist-column">
          <h3 className="skilllist-subheading">Your Skills</h3>
          {userSkills.map((skill) => (
            <div key={skill.id} className="skill-card card-hover">
              <p><strong>{skill.title}</strong></p>
              <p>{skill.description}</p>
              <div className="skill-actions">
                <button onClick={() => handleEdit(skill.id)} className="btn btn-warning">Edit</button>
                <button onClick={() => handleDelete(skill.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="skilllist-column">
          <h3 className="skilllist-subheading">Other Users' Skills</h3>
          {otherSkills.map((skill) => (
            <div key={skill.id} className="skill-card card-hover">
              <Link to={`/skills/${skill.id}`} className="skill-link">
                <strong>{skill.title}</strong>
              </Link>
              <p>{skill.description}</p>
              <div className="skill-actions">
                <button onClick={() => handleBooking(skill.id)} className="btn btn-success">Request</button>
                <Link to={`/messages/${skill.userId}`}>
                  <button className="btn btn-info">Message</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillList;
