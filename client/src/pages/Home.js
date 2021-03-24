import React from "react";
import Goal from "../components/Goal";
import "../styles/Layout.css";

export default (props) => {
  const { account } = props;

  if (account !== null && account !== undefined) {
    return (
      <div className="background">
        <header className="head">
          <h1>Welcome back, {account.firstName}</h1>
        </header>
        <div className="main">
          <Goal account={props.account} />
        </div>
        <div className="main">
          {/* Let's Do A Pomodoro Timer w/Tasks! */}
        </div>
      </div>
    );
  } else {
    <div>Thanks for stopping by...</div>;
  }
};
