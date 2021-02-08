import React, { useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  color: white;
  font-size: 1em;
  margin-top: 15em;
  padding: 0.25em 1em;
  border: 2px solid white;
  border-radius: 3px;
  display: block;
  background-color: transparent;
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
