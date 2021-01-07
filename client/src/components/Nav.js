import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <header className="newnav">
      <nav>
        <NavLink activeClassName="nav-active" to="/home">
          Home
        </NavLink>
        <NavLink activeClassName="nav-active" to="/lessons">
          Lessons
        </NavLink>
        <NavLink activeClassName="nav-active" to="/resources">
          Resources
        </NavLink>
        <NavLink activeClassName="nav-active" to="/achievements">
          Achievements
        </NavLink>
      </nav>
    </header>
  );
};

export default Nav;
