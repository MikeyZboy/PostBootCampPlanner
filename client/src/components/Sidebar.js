import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateTime from '../components/DateTime'
import { NavLink } from 'react-router-dom'
import SignOut from '../components/SignOut'
import PBCP from '../styles/assets/PBCPlogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faLaptopCode, faBookmark, faAward, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const SidebarContainer = styled.div`
  height: 100%;
  width: 15%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #194d44;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
`;

const SidebarMenu = styled.ul`
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style: none;
  text-decoration: none;
  width: 100%;
  padding: 0px 30px;
  margin-top: 4em;
`;

// const SidebarMenuItem = styled.li`
//   list-style: none;
//   position: relative;
//   text-decoration: none;
//   margin-left: 0;
//   height: 40px;
//   width: 100%;
//   &:hover {
//     background: rgba(255, 255, 255, 0.05);
//     // box-shadow: 3px;
//     cursor: pointer;
//   }
// `;
  
  const SidebarMenuItem = styled.a`
    margin: 1em;
    padding: 8px 0px 8px 0px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    &:hover {
      transform: scale(1.5);
    }
  `;

  const SidebarMenuItemLabel = styled.p` 
    text-decoration: none;
    margin-top: 20px;
    padding-bottom: 10px;
    font-family: "Roboto Mono", monospace;
    font-size: 17px;
    font-weight: bolder;
    line-height: 2;
    color: #ffffff;
    max-width: 15%;
    &:hover {
      display: block;
    }
  `;

const Icon = styled.svg`
  width: 40px;
  height: 40px;
  margin-right: 30px;
  color: white;
  &:hover{
    background: rgba(255,255,255,0.05);
    cursor: pointer;
    transform: scale(1.5);
  }
`;

const SignOutButton = styled.div`
  margin-top: 1em;
`;

const Logo = styled.img`
  margin: 0 auto;
  padding: 1em;
`;

const Sidebar = () => {
  
  const [show, setShow] = useState('')

  const startShow = () => {
    setShow("block")
  }

  useEffect(()=>{},[])

  const clearAccount = () => {
     localStorage.clear("account_id");
  };

  return (
    <div onMouseOut={setShow}>
      <SidebarContainer onMouseOut={setShow}>
        <Logo src={PBCP} />
        <DateTime />
        <SidebarMenu>
        <NavLink className="active" to="/home">
          <SidebarMenuItem onMouseOut={setShow}>
            <Icon onMouseOver={startShow}>
              <FontAwesomeIcon icon={faCalendarDay} />
            </Icon>
            <SidebarMenuItemLabel style={{ display: `${show}` }}>
              Calendar
            </SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
        <NavLink className="active" to="/lessons">
          <SidebarMenuItem onMouseOut={setShow}>
            <Icon onMouseOver={startShow}>
              <FontAwesomeIcon icon={faLaptopCode} />
            </Icon>
            <SidebarMenuItemLabel style={{ display: `${show}` }}>
              Lessons
            </SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
        <NavLink className="active" to="/resources">
          <SidebarMenuItem onMouseOut={setShow}>
            <Icon onMouseOver={startShow}>
              <FontAwesomeIcon icon={faBookmark} />
            </Icon>
            <SidebarMenuItemLabel style={{ display: `${show}` }}>
              Resources
            </SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
        <NavLink className="active" to="/achievements">
          <SidebarMenuItem onMouseOut={setShow}>
            <Icon onMouseOver={startShow}>
              <FontAwesomeIcon icon={faAward} />
            </Icon>
            <SidebarMenuItemLabel style={{ display: `${show}` }}>
              Achievements
            </SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
        </SidebarMenu>
        <SignOutButton>
          <NavLink className="active" to="/welcome">
            <SidebarMenuItem onMouseOut={setShow}>
              <Icon onMouseOver={startShow}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  component={<SignOut onClick={clearAccount} />}
                />
              </Icon>
              <SidebarMenuItemLabel style={{ display: `${show}` }}>
                Sign Out
              </SidebarMenuItemLabel>
            </SidebarMenuItem>
          </NavLink>
        </SignOutButton>
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;
