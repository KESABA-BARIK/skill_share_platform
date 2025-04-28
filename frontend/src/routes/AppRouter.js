import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EditProfile from '../pages/EditProfile';
import SkillList from '../components/SkillList';
import AddSkill from '../pages/AddSkill';
import Dashboard from "../pages/Dashboard";
import ScheduleDashboard from "../pages/ScheduleDashboard";
import MyRequests from "../pages/MyRequests";
import IncomingRequests from "../pages/IncomingRequests";
import Conversation from "../pages/Conversation";
import EditSkill from "../pages/EditSkill";
import SkillDetail from "../pages/SkillDetail";


const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/edit-skill/:id" element={<EditSkill />} />
        <Route path="/skills" element={<SkillList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<ScheduleDashboard />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/incoming-requests" element={<IncomingRequests />} />
        <Route path="/messages/:userId" element={<Conversation />} />
        <Route path="/skills/:id" element={<SkillDetail />} />



      </Routes>
    </Router>
  );
};

export default AppRouter;
