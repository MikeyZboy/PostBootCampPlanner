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
  margin: 1.5em;
  padding: 1em;
  height: 75vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 50px;
  color: grey;
  border: 2px dotted gray;
  border-radius: 15px;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
  overflow: scroll;
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
  font-size: 1.5em;
  font-weight: 700;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  background: #194d44;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const AchievementCard = styled.div`
  height: 400px;
  width: 300px;
  padding: .5em, 1em;
  margin: 1em;
  border: 2px solid gray;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const Image = styled.img`
  height: auto;
  margin: 10px;
  border-radius: 10px;
  max-width: 275px;
  &:hover{
    transform: translateZ(150%);
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
    setTimeout(() => {
    clicked === "none" ? setClicked("list-item") : setClicked("none")
    }, 3000)
  }

  return (
    <div>
      <header className="head">
        <h1>{account.firstName}'s Achievements!</h1>
      </header>
      <FormHolder>
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
        <form onSubmit={handleSubmit} className="inapp-form">
          <input
            type="text"
            name="name"
            placeholder="Achievement Name"
            onChange={handleChange}
            style={{ display: `${clicked}` }}
            contentEditable
          />
          <button
            style={{ display: `${clicked}` }}
            onClick={() => {
              toggleClick();
            }}
          >
            Post
          </button>
        </form>
      </FormHolder>
      <AchievementsHolder>
          {achievements.length ? (
            achievements.map((achievement, index) => (
              <AchievementCard key={index}>
                <h4>{achievement.name}</h4>
                <Image src={achievement.achievementImage} alt="uploaded post"/>
                <button onClick={() => handleDelete(achievement)}>
                  Delete
                </button>
              </AchievementCard>
            ))
          ) : (
            <h3>No Posts Yet</h3>
          )}
      </AchievementsHolder>
    </div>
  );
};

export default Achievements;
