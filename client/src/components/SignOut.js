import React, { useState } from "react";
import { Redirect } from "react-router";

export default ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const [signedOut, setSignedOut] = useState(false);

  const clearAccount = () => {
    localStorage.clear("account_id");
    onClick();
    setSignedOut(true);
  };

  if (signedOut) {
    <Redirect to="/" push={true} />;
  } else {
    return (
      <button className={"btn-list"} onClick={(e) => clearAccount()}>
        Sign Out
      </button>
    );
  }
};
