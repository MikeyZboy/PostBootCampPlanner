import React, { useState, useEffect } from "react";
import {  __GetAchievements, __CreateAchievement } from '../services/AchievementService'


const Achievements = (props) => {
    console.log('achievements, props:',props)
    const { account } = props
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({ name: "", achievementImage: "" });
  const [fileName, setFilename] = useState(""); //<-- what is this?
  
  const fetchAchievements = async () => {
    const data = await __GetAchievements();
    setAchievements(data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append('name', newAchievement.name)
      formData.append('achievementImage', newAchievement.achievementImage)
      formData.append('accountId', account.id )
      console.log(formData)
      let achievement = await __CreateAchievement(formData)
      console.log(achievement)
  };

  const handleChange = (e) => {
    setNewAchievement({
      ...newAchievement,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value
    });
  };

  const handleDelete = () => {
      console.log('clicked delete')
  }

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newAchievement.name}
            name="name"
            placeholder="Name of Achievement"
            onChange={handleChange}
          />
          <input
            type="file"
            placeholder="Upload A File"
            name="achievementImage"
            onChange={handleChange}
          />
          <button>Post Achievement</button>
        </form>
      </div>
      {achievements.length ? (
        achievements.map((achievement) => (
          <div key={achievement.id}>
            <h4>{achievement.name}</h4>
            <img
              className="achievement-image"
              src={achievement.achievementImage}
            />
            <button onClick={handleDelete}>Delete</button>
          </div>
        ))
      ) : (
        <h3>No Achievements Yet</h3>
      )}
    </div>
  );
};

export default Achievements;
