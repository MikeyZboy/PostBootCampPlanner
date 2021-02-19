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
  width: 20%;
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
  padding: 0px 15px;
  margin-top: 4em;
`;
  
  const SidebarMenuItem = styled.a`
    margin-top: 1em;
    padding: 8px 0px 8px 0px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  `;

  const SidebarMenuItemLabel = styled.p`
    display: inline-block;
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
      cursor: pointer;
      transition: 3s;
    }
  `;

const Icon = styled.svg`
  width: 40px;
  height: 40px;
  margin-right: 30px;
  color: white;
  &:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const SignOutButton = styled.div`
  margin-top: 1em;
`;

const Logo = styled.img`
  top: 0;
  left: 0;
  position: absolute;
  margin: 0 auto;
  padding: .5em;
`;

const SideBarOpenButton = styled.button`
  position: relative;
  font-size: 40px;
  margin: 3em;
  cursor: pointer;
  background-color: #fff;
`;

const SideBarCloseButton = styled.button`
  position: relative;  
  right: 25px;
  font-size: 40px;
  margin: 3em;
  cursor: pointer;
  background-color: #fff;
`;

const Sidebar = () => {
  
  const [sideBarOpen, setSideBarOpen] = useState('show')
  const [sideBarClose, setSideBarClose] = useState('hidden')
  
  const handleOpen = () => {
    setSideBarOpen('hidden')
    setSideBarClose('show')
  }

  const handleClose = () => {
    setSideBarClose('hidden')
    setSideBarOpen('show')
  }

  useEffect(()=>{},[])

  const clearAccount = () => {
     localStorage.clear("account_id");
  };

  return (
    <SidebarContainer>
      <Logo src={PBCP} />
      <SideBarOpenButton
        onClick={handleOpen}
        style={{ display: `${sideBarOpen}` }}
      />
      <SideBarCloseButton
        onClick={handleClose}
        style={{ display: `${sideBarClose}` }}
      />
      <DateTime />
      <SidebarMenu>
        <NavLink className="active" to="/home">
          <SidebarMenuItem>
            <Icon>
              <FontAwesomeIcon icon={faCalendarDay} />
            </Icon>
            <SidebarMenuItemLabel>Calendar</SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
        <NavLink className="active" to="/lessons">
          <SidebarMenuItem>
            <Icon>
              <FontAwesomeIcon icon={faLaptopCode} />
            </Icon>
            <SidebarMenuItemLabel>Lessons</SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
        <NavLink className="active" to="/resources">
          <SidebarMenuItem>
            <Icon>
              <FontAwesomeIcon icon={faBookmark} />
            </Icon>
            <SidebarMenuItemLabel>Resources</SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
        <NavLink className="active" to="/achievements">
          <SidebarMenuItem>
            <Icon>
              <FontAwesomeIcon icon={faAward} />
            </Icon>
            <SidebarMenuItemLabel>Achievements</SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
      </SidebarMenu>
      <SignOutButton>
        <NavLink className="active" to="/welcome">
          <SidebarMenuItem>
            <Icon>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                component={<SignOut onClick={clearAccount} />}
              />
            </Icon>
            <SidebarMenuItemLabel>Sign Out</SidebarMenuItemLabel>
          </SidebarMenuItem>
        </NavLink>
      </SignOutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
