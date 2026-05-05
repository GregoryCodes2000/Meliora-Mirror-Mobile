import React, { useState } from "react";
import profileIcon from "/home/kasm-user/Documents/21_nav_mirr/08_nav_mirr_gh/src/assets/profile.png";
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
