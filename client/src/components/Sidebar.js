import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateTime from '../components/DateTime'
import { NavLink } from 'react-router-dom'
import SignOut from '../components/SignOut'
import PBCP from '../styles/assets/PBCPlogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faLaptopCode, faBookmark, faAward, faSignOutAlt, faBars, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'

const SidebarContainer = styled.div`
  height: 100%;
  width: 20%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #194d44;
  overflow-x: hidden;
  transition: 0.5s;
`;

const SidebarMenu = styled.ul`
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style: none;
  text-decoration: none;
  width: 75%;
  padding: 0px 15px;
  margin-top: 2em;
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
  position: relative;
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

const LDTContainer = styled.div`
  top: 0;
  padding: 10px;
  margin: 10px;
`;

const NavButtonsContainer = styled.div`
  padding: 10px;
  margin: 10px;
  margin-top: 40px;
`;

const MinimizedContainer = styled.div`
  width: 75px;
  height: 100%;
  background-color: #194d44;;
  position: fixed;
`;

const Sidebar = () => {
  
  const [sideBarOpenButton, setSideBarOpenButton] = useState('inline')
  const [sideBarCloseButton, setSideBarCloseButton] = useState('inline')
  const [clicked, setClicked] = useState(false)

  const handleOpen = (e) => {
    setSideBarOpenButton('none')
    setSideBarCloseButton('inline')
    setClicked(true)
  }

  const handleClose = () => {
    setSideBarCloseButton('none')
    setSideBarOpenButton('inline')
    setClicked(false)
  }

  useEffect(()=>{},[])

  const clearAccount = () => {
     localStorage.clear("account_id");
  };

  return (
    <div>
      {clicked ? (
        <SidebarContainer>
          <LDTContainer>
            <Logo src={PBCP} />
            <DateTime />
          </LDTContainer>
          <NavButtonsContainer>
            <Icon
              onClick={(e) => handleClose(e)}
              style={{ display: `${sideBarCloseButton}` }}
            >
              <FontAwesomeIcon
                icon={faAngleDoubleLeft}
                component={<SideBarCloseButton />}
              />
            </Icon>
          </NavButtonsContainer>
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
                <Icon style={{ transform: `scaleX(-1)` }}>
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
      ) : (
        <MinimizedContainer>
          <NavButtonsContainer>
            <Icon
              onClick={(e) => handleOpen(e)}
              style={{ display: `${sideBarOpenButton}` }}
            >
              <FontAwesomeIcon
                icon={faBars}
                component={<SideBarOpenButton />}
              ></FontAwesomeIcon>
            </Icon>
          </NavButtonsContainer>
          <SidebarMenu>
            <NavLink className="active" to="/home">
              <SidebarMenuItem>
                <Icon>
                  <FontAwesomeIcon icon={faCalendarDay} />
                </Icon>
              </SidebarMenuItem>
            </NavLink>
            <NavLink className="active" to="/lessons">
              <SidebarMenuItem>
                <Icon>
                  <FontAwesomeIcon icon={faLaptopCode} />
                </Icon>
              </SidebarMenuItem>
            </NavLink>
            <NavLink className="active" to="/resources">
              <SidebarMenuItem>
                <Icon>
                  <FontAwesomeIcon icon={faBookmark} />
                </Icon>
              </SidebarMenuItem>
            </NavLink>
            <NavLink className="active" to="/achievements">
              <SidebarMenuItem>
                <Icon>
                  <FontAwesomeIcon icon={faAward} />
                </Icon>
              </SidebarMenuItem>
            </NavLink>
            <NavLink className="active" to="/welcome">
              <SidebarMenuItem>
                <Icon style={{ transform: `scaleX(-1)` }}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    component={<SignOut onClick={clearAccount} />}
                  />
                </Icon>
              </SidebarMenuItem>
            </NavLink>
          </SidebarMenu>
        </MinimizedContainer>
      )}
    </div>
  );
};

export default Sidebar;
