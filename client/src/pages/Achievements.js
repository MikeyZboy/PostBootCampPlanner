import React, { useState, useEffect } from "react";
import {
  __GetAchievements,
  __CreateAchievement,
  __DeleteAchievement,
} from "../services/AchievementService";
import "../styles/Achievements.css";
import styled from 'styled-components'

const AchievementsHolder = styled.section`
  position: relative;
  margin: 0 auto;
  margin-top: 1.5em;
  height: 75vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 50px;
  color: grey;
  border: 5px solid black;
  border-radius: 15px;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const FormHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  padding: 2em;
  margin: 10px 250px;
  margin-top: 2em;
  height: auto;
  width: 1fr;

`;

const UploadButton = styled.button`
  width: 1fr;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  background: #1fb0b5;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Achievements = (props) => {
  const { account } = props;

  const [ clicked, setClicked ] = useState("none")
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
      setClicked()
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
  
  // --> clicking Upload Button to display file input
  const hiddenFileInput = React.useRef(null);
  const uploadClick = () => {
    hiddenFileInput.current.click()  
    toggleClick()
  }
  
  const toggleClick = () => {
    setInterval(100000)
    clicked === "none" ? setClicked("list-item") : setClicked("none")
  }

  return (
    <div>
      <header className="head">
        <h1>{account.firstName}'s Achievements!</h1>
      </header>
      <FormHolder>
        {/* <form onSubmit={handleSubmit}> */}
          <UploadButton onClick={uploadClick}>
            Upload an Achievement
            <input
              type="file"
              ref={hiddenFileInput}
              placeholder="Upload A File"
              name="achievementImage"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </UploadButton>
          <input
            type="text"
            name="name"
            placeholder="Name of Achievement"
            onChange={handleChange}
            style={{ display: `${clicked}` }}
          />
          <button
            style={{ display: `${clicked}` }}
            onClick={() => {
              toggleClick();
            }}
            onSubmit={handleSubmit}
          >
            Post
          </button>
        {/* </form> */}
      </FormHolder>
      <AchievementsHolder>
        <div className="upload-container">
          {achievements.length ? (
            achievements.map((achievement, index) => (
              <div key={index} className="card">
                <h4>{achievement.name}</h4>
                <img src={achievement.achievementImage} />
                <button onClick={() => handleDelete(achievement)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <h3>No Achievements Yet</h3>
          )}
        </div>
      </AchievementsHolder>
    </div>
  );
};

export default Achievements;
