import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "../styles/LandingPage.css";

const Welcome = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="landing-container">
      <h1>Post BootCamp Planner</h1>
      <p>“A browser based planner for nonstop learning!”</p>
      <div className="landing-btns">
        <NavLink
          to="/signup"
          // activeclassName="nav-active"
          onClick={handleClick}
        >
          <button>Get Started</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Welcome;
