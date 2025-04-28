import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { skills } = useSelector((state) => state.skill);

  const userId = Number(userInfo?.user?.id);
  const userSkills = skills.filter((skill) => skill.userId === userId);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Dashboard</h2>

      <div style={styles.profileCard}>
        <img src={userInfo?.user?.avatarUrl} alt="Avatar" style={styles.avatar} />
        <div>
          <h3 style={styles.name}>{userInfo?.user?.name}</h3>
          <p style={styles.bio}>{userInfo?.user?.bio}</p>
          <p style={styles.location}>📍 {userInfo?.user?.location}</p>
        </div>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h4 style={styles.statNumber}>{userSkills.length}</h4>
          <p style={styles.statLabel}>Skills Shared</p>
        </div>
      </div>

      <div style={styles.skillsSection}>
        <h3 style={styles.subHeading}>🛠️ Your Skills</h3>
        <ul style={styles.skillList}>
          {userSkills.slice(0, 3).map((skill) => (
            <li key={skill.id} style={styles.skillItem}>
              <strong>{skill.title}</strong> — {skill.description}
            </li>
          ))}
        </ul>
        <button className="view-all-btn" onClick={() => navigate("/skills")}>
          View All
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#121212",
    borderRadius: "16px",
    color: "#f0f0f0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 0 20px rgba(0, 229, 255, 0.15)",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#00e5ff",
    textShadow: "0 0 8px #00e5ff",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "1.5rem",
    borderRadius: "12px",
    background: "#1e1e1e",
    border: "2px solid #ff4081",
    boxShadow: "0 6px 18px rgba(255, 64, 129, 0.2)",
    marginBottom: "2rem",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #00e5ff",
    boxShadow: "0 0 10px #00e5ff",
  },
  name: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    color: "#fff",
  },
  bio: {
    marginBottom: "0.3rem",
    color: "#ccc",
  },
  location: {
    color: "#ff80ab",
    fontStyle: "italic",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  statCard: {
    background: "#00bcd4",
    color: "#121212",
    borderRadius: "10px",
    padding: "1.5rem",
    minWidth: "140px",
    textAlign: "center",
    boxShadow: "0 0 12px rgba(0, 188, 212, 0.3)",
  },
  statNumber: {
    fontSize: "2rem",
    margin: "0 0 0.5rem",
  },
  statLabel: {
    margin: 0,
    fontWeight: "bold",
  },
  skillsSection: {
    textAlign: "center",
  },
  subHeading: {
    marginBottom: "1rem",
    fontSize: "1.4rem",
    color: "#00e5ff",
    textShadow: "0 0 6px #00e5ff",
  },
  skillList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "1.5rem",
  },
  skillItem: {
    backgroundColor: "#252525",
    marginBottom: "0.75rem",
    padding: "0.75rem 1.2rem",
    borderRadius: "8px",
    textAlign: "left",
    boxShadow: "0 2px 6px rgba(255, 64, 129, 0.15)",
  },
  viewAllBtn: {
    padding: "0.6rem 1.4rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff4081",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 0 10px #ff4081",
    transition: "all 0.3s ease",
  },
};

export default Dashboard;
