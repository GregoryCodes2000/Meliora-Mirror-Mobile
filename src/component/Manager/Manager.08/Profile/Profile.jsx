


import React, { useState } from "react";
import profileIcon from "./profile_2.png";
import "./profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile">
        <img src={profileIcon} className="profile-icon" />
        <div className="personal">
          <div className="name">
            <label>Name:</label>
            <input></input>
          </div>
          <div className="email">
            <label>E-mail:</label>
            <input></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
