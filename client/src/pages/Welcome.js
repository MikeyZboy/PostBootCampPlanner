import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Welcome.css";
import styled from 'styled-components'

const WelcomeContainer = styled.div`
  height: auto;
  width: 40%;
  margin: 0 auto;
  margin-top: 10em;
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: large;
  border: 3px solid grey;
  border-radius: 15px;
  position: relative;
  align-items: center;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #194d44;
`;

const WelcomeContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 15px;
  &:hover {
    transform: scale(1.1);
  }
`;

const GetStartedButton = styled.button`
  position: relative;
  border: 2px solid gray;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 1em;
  margin: 1em;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  font-family: "Roboto Mono", monospace;
  font-weight: bolder;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Welcome = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <WelcomeContainer>  
      <WelcomeContent>
          <h1 className="white">Post BootCamp Planner</h1>
          <p>A browser based planner for nonstop learning!</p>
          <NavLink to="/signup" onClick={handleClick}>
            <GetStartedButton>Start</GetStartedButton>
          </NavLink>
      </WelcomeContent>
    </WelcomeContainer>
  );
};

export default Welcome;
