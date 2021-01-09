import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from '../components/SignOut'

const Nav = () => {
  return (
    <header className="newnav">
      <nav>
        <NavLink to="/home">
          Home
        </NavLink>
        <NavLink to="/lessons">
          Lessons
        </NavLink>
        <NavLink to="/resources">
          Resources
        </NavLink>
        <NavLink to="/achievements">
          Achievements
        </NavLink>
        <NavLink to ="/">
          <SignOut />
        </NavLink>
      </nav>
    </header>
  );
};

export default Nav;
