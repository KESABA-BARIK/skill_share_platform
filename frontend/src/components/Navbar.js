import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">SkillShare</h1>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
        <Link to="/skills" className="navbar-link">Skills</Link>
        <Link to="/my-requests" className="navbar-link">My Bookings</Link>
        <Link to="/incoming-requests" className="navbar-link">Incoming Requests</Link>
        {!userInfo ? (
          <Link to="/login" className="navbar-login-btn">Login</Link>
        ) : (
          <button onClick={handleLogout} className="navbar-logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
