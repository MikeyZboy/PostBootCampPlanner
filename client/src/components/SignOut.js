import React, { useState } from "react";
import { Redirect } from "react-router";

export default () => {
  const [signedOut, setSignedOut] = useState(false);

  const clearAccount = () => {
    localStorage.clear("account_id");;
    setSignedOut(true);
  };

  if (signedOut) {
    <Redirect to="/" push={true} />;
  } else {
    return (
      <button className={"btn-list"} onClick={clearAccount}>
        Sign Out
      </button>
    );
  }
};
