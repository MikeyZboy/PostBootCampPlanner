import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Welcome.css";
import styled from 'styled-components'

const WelcomeContainer = styled.div`
  height: auto;
  width: 40%;
  margin: 0 auto;
  margin-top: 2em;
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
            <button className="submit-button">Get Started</button>
          </NavLink>
      </WelcomeContent>
    </WelcomeContainer>
  );
};

export default Welcome;
