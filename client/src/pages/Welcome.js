import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Welcome.css";

const Welcome = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="welcome-container">
      <div className="welcome-div">
        <div className="welcome-card">
          <h1>Post BootCamp Planner</h1>
          <p>“A browser based planner for nonstop learning!”</p>
          <NavLink to="/signup" onClick={handleClick}>
            <button className="submit-button">Get Started</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
