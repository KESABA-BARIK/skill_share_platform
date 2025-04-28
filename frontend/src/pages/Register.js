import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }
    dispatch(registerUser(form, navigate));
  };

  return (
    <div className="register-container">
  <div className="register-card">
    <h2 className="register-title">Create an Account</h2>
    <form onSubmit={handleSubmit} className="register-form">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="register-input"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="register-input"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="register-input"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="register-input"
        required
      />
      <button type="submit" className="register-button">Register</button>
    </form>
    <p className="register-redirect">
      Already have an account? <a href="/login" className="register-link">Login</a>
    </p>
  </div>
</div>

  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6e8efb",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  redirect: {
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  link: {
    color: "#6e8efb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
