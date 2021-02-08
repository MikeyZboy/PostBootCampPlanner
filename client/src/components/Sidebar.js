import React from "react";
import styled from "styled-components";
import DateTime from '../components/DateTime'
import { NavLink } from 'react-router-dom'
import SignOut from '../components/SignOut'
import PBCP from '../styles/assets/PBCPlogo.png'

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #194d44;
  color: #fff;
`;

const SidebarMenuItem = styled.li`
  height: 40px;
  width: 100%;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 3px 0 0 0 #ffffff;
    cursor: pointer;
  }
`;
const SidebarMenu = styled.ul`
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style: none;
  width: 100%;
  padding: 0px 30px;
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
`;

const SidebarMenuItemLabel = styled.p`
  margin-top: 0;
  font-family: "Open Sans", sans-serif;
  font: ;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  color: #ffffff;
  text-align: left;
`;

const Logo = styled.img`
  margin: 0 auto;
  padding: 1em;
`;

const Sidebar = () => {
  
  const clearAccount = () => {
     localStorage.clear("account_id");
  };

  return (
      <div>
        <SidebarContainer>
          <Logo src={PBCP}/>
          <DateTime />
          <SidebarMenu>
            <NavLink to="/home">
              <SidebarMenuItem>
                <Icon></Icon>
                <SidebarMenuItemLabel>Home</SidebarMenuItemLabel>
              </SidebarMenuItem>
            </NavLink>
            <NavLink to="/lessons">
              <SidebarMenuItem>
                <Icon></Icon>
                <SidebarMenuItemLabel>Lessons</SidebarMenuItemLabel>
              </SidebarMenuItem>
            </NavLink>
            <NavLink to="/resources">
              <SidebarMenuItem>
                <Icon></Icon>
                <SidebarMenuItemLabel>Resources</SidebarMenuItemLabel>
              </SidebarMenuItem>
            </NavLink>
            <NavLink to="/achievements">
              <SidebarMenuItem>
                <Icon></Icon>
                <SidebarMenuItemLabel>Achievements</SidebarMenuItemLabel>
              </SidebarMenuItem>
            </NavLink>      
            <NavLink to="/welcome">
            <SignOut onClick={clearAccount}/>         
            </NavLink>
          </SidebarMenu>
        </SidebarContainer>
      </div>
  );
};

export default Sidebar;
