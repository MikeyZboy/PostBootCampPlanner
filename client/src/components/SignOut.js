import React, { useState } from "react";
import { Redirect } from "react-router";
import Welcome from '../pages/Welcome'

export default () => {
  const [signedOut, setSignedOut] = useState(false);

  const clearAccount = async () => {
    localStorage.clear("account_id");;
    setSignedOut(true);
  };

  if (signedOut) {
    <Redirect component={<Welcome />} push={true} />;
  } else {
    return (
      <button className="signout-button" onClick={clearAccount}>
        Sign Out
      </button>
    );
  }
};
