import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from '../components/SignOut'
// import TabPanel from '../components/TabPanel'
// import HomeIcon from '@material-ui/icons/Home';
// import MenuBookIcon from "@material-ui/icons/MenuBook";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <header className="nav">
      <nav>
        {/* <TabPanel> */}
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
        {/* </TabPanel> */}
      </nav>
    </header>
  );
};

export default Nav;
