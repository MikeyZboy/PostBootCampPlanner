import React, { useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  color: white;
  font-size: 1em;
  margin: 250px auto;
  padding: 0.25em 1em;
  border: 2px solid white;
  border-radius: 3px;
  display: block;
  background-color: transparent;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 3px 0 0 0 #ffffff;
    cursor: pointer;
  }
`;

export default () => {
  const [signedOut, setSignedOut] = useState(false);

  const clearAccount = async () => {
    localStorage.clear("account_id");
    console.log("account cleared");
    setSignedOut(true);
  };

  if (signedOut) {
    <Redirect path="/welcome" push={true} />;
  } else {
    return <Button onClick={clearAccount}> Sign Out</Button>;
  }
};
