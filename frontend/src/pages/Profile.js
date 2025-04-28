import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserReviews from "../components/UserReviews";
import "./Profile.css";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    return <p className="profile-not-logged">You are not logged in.</p>;
  }

  const userId = userInfo.user.id;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>
      <div className="profile-card">
        {userInfo.user.avatarUrl && (
          <img
            src={userInfo.user.avatarUrl}
            alt="Profile"
            className="profile-avatar"
          />
        )}
        <p><strong>Name:</strong> {userInfo.user.name}</p>
        <p><strong>Email:</strong> {userInfo.user.email}</p>
        <p><strong>Bio:</strong> {userInfo.user.bio}</p>
        <p><strong>Location:</strong> {userInfo.user.location}</p>

        <Link to="/edit-profile">
          <button className="profile-edit-btn">Edit Profile</button>
        </Link>
      </div>

      <div className="profile-reviews">
        <h3>What people are saying about you</h3>
        <UserReviews userId={userId} />
      </div>
    </div>
  );
};

export default Profile;
