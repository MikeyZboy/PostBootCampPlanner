import React, { useState, useEffect } from "react";
import {
  __GetAchievements,
  __CreateAchievement,
  __DeleteAchievement,
} from "../services/AchievementService";
import "../styles/Achievements.css";

const Achievements = (props) => {
  const { account } = props;
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    name: "",
    achievementImage: "",
  });

  const fetchAchievements = async () => {
    const data = await __GetAchievements();
    setAchievements(data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", newAchievement.name);
      formData.append("achievementImage", newAchievement.achievementImage);
      formData.append("accountId", account.id);
      let achievement = await __CreateAchievement(formData);
      fetchAchievements();
      setNewAchievement()
      e.target.reset()
    }
    catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e) => {
    setNewAchievement({
      ...newAchievement,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleDelete = async (achievement) => {
    let id = achievement.id;
    const updatedAchievements = await __DeleteAchievement(id);
    setAchievements(updatedAchievements);
    fetchAchievements();
  };

  return (
    <div>
      <header className="head">
        <h1>Great Success {account.firstName}!</h1>
      </header>
      <div className="form-container form-div">
        <form className="inapp-form" onSubmit={handleSubmit}>
          <input
            type="file"
            placeholder="Upload A File"
            name="achievementImage"
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name of Achievement"
            onChange={handleChange}
          />
          <button>Post</button>
        </form>
      </div>
      <div className="upload-container">
      {achievements.length ? (
        achievements.map((achievement, index) => (  
          <div key={index} className="card">
            <h4>{achievement.name}</h4>
            <img
              src={achievement.achievementImage}
            />
            <button onClick={() => handleDelete(achievement)}>Delete</button>
          </div>
        ))
      ) : (
        <h3>No Achievements Yet</h3>
      )}
      </div>
    </div>
  );
};

export default Achievements;
