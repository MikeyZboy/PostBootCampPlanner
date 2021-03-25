import React, { useState, useEffect } from "react";
import {
  __GetAchievements,
  __CreateAchievement,
  __DeleteAchievement,
} from "../services/AchievementService";
import "../styles/Achievements.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Icon = styled.svg`
  position: relative;
  display: inline;
  width: 40px;
  height: 40px;
  padding-left: 5px;
  padding-top: 5px;
  color: green;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const PreAchievementsHolder = styled.div`
  position: relative;
  padding: 1em;
  margin-bottom: 1em;
  height: auto;
  width: 75vw;
  border: none;
`;

const PostAchievementsHolder = styled.div`
  position: relative;
  padding: 1em;
  margin-bottom: 1em;
  height: auto;
  width: 75vw;
  display: flex;
  flex-flow: row wrap;
  border: 5px solid #194d44;
  border-radius: 15px;
  &:hover {
    box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const FormHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  padding: 1em;
  margin: 10px 250px;
  margin-top: 1em;
  height: auto;
  width: 1fr;
`;

const UploadButton = styled.button`
  max-width: 75vw;
  font-size: 1.25em;
  font-weight: 600;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: none;
  background: transparent;
  color: #194d44;
  &:hover {
    background-color: #194d44;
    color: white;
    border: 2px solid gray;
    border-radius: 3px;
  }
`;

const BootCampDiv = styled.div`
  padding: 1em;
  margin-top: 2em;
  &:hover {
    transform: scale(1.3);
  }
`;

const AchievementCard = styled.div`
  height: auto;
  max-height: 500px;
  width: 300px;
  padding: 0.5em, 1em;
  margin: 1em;
  background-color: lightgray;
  border: 2px solid gray;
  border-radius: 10px;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
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
  &:hover {
    transform: translateZ(150%);
  }
`;

const DeleteButton = styled.svg`
  display: block;
  border: transparent;
  background-color: transparent;
  color: #194d44;
  margin: 0 auto;
  padding: 5px;
  height: 40px;
  width: 40px;
`;

const Achievements = (props) => {
  const { account } = props;

  const [show, setShow] = useState(false)
  const [clicked, setClicked] = useState("none");
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
      setNewAchievement();
      setClicked();
      e.target.reset();
    } catch (error) {
       throw error
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

  const hiddenFileInput = React.useRef(null);
  const uploadClick = () => {
    hiddenFileInput.current.click();
    toggleClick();
  };

  const handleShow = () => {
    show === false ? setShow(true) : setShow(false)
  }

  const toggleClick = () => {
    setTimeout(() => {
      clicked === "none" ? setClicked("list-item") : setClicked("none");
    }, 3000);
  };

  return (
    <div>
      <header className="head">
        <h1>{account.firstName}'s Achievements</h1>
      </header>
      <BootCampDiv>
        <h1 style={{ textDecoration: `underline #194d44` }}>Bootcamp:</h1>
        <h2>
          {account.bootcamp}
          <Icon>
            <FontAwesomeIcon icon={faCheckSquare} />
          </Icon>
        </h2>
      </BootCampDiv>
      <FormHolder>
        <UploadButton onClick={uploadClick} onMouseOver={handleShow} onMouseOut={handleShow}>
          Post Something You're Proud Of!
          <input
            type="file"
            ref={hiddenFileInput}
            placeholder="Upload A File"
            name="achievementImage"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </UploadButton>
        <form onSubmit={handleSubmit} className="dark-form">
          <input
            className="dark-form"
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
        {!achievements.length ? (
          <PreAchievementsHolder>
          { show && 
          <h3 style={{margin: `0 auto`}}>No Posts Yet</h3>
        }
      </PreAchievementsHolder>
        ) : (
       <PostAchievementsHolder>   
          {achievements.map((achievement, index) => (
            <AchievementCard key={index}>
              <h4 style={{ color: `#194d44` }}>{achievement.name}</h4>
              <Image src={achievement.achievementImage} alt="uploaded post" />
              <DeleteButton
                type="button"
                onClick={() => handleDelete(achievement)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </DeleteButton>
            </AchievementCard>
          ))}
      </PostAchievementsHolder>
        )
        }
    </div>
  );
};

export default Achievements;
