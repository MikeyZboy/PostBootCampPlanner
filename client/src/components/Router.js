import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Lessons from "../pages/Lessons";
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Achievements from '../pages/Achievements'
import { __GetProfile } from "../services/AccountService";

export default function Router() {
  const [account, setAccount] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const retrieveAccount = async () => {
    const localAccountId = localStorage.getItem("account_id");
    try {
      const thisAccount = await __GetProfile(parseInt(localAccountId));
      setAccount(thisAccount);
      console.log(thisAccount);
      return thisAccount;
    } catch (error) {}
  };

  useEffect(() => {
    retrieveAccount();
  }, []);

  const clearAccount = () => {
    setAccount(null);
  };

  return (
    <main>
      <Switch>
        <Route exact path="/" component={() => <Welcome />} />
        <Route
          exact
          path="/signup"
          component={(props) => <SignUp {...props} setAccount={setAccount} />}
        />
        <Route
          exact
          path="/signin"
          component={(props) => <SignIn {...props} setAccount={setAccount} />}
        />
        <ProtectedRoute
          authenticated={account !== null}
          path="/home"
          component={(props) => (
            <Home
              {...props}
              account={account}
              onClickSignOut={clearAccount}
              setNeedsRefresh={setNeedsRefresh}
            />
          )}
        />
        <ProtectedRoute
          authenticated={account !== null}
          path="/lessons"
          component={(props) => (
            <Lessons
              {...props}
              account={account}
              onClickSignOut={clearAccount}
            />
          )}
        />
        <ProtectedRoute
          authenticated={account !== null}
          path="/achievements"
          component={(props) => (
            <Achievements
              {...props}
              account={account}
              onClickSignOut={clearAccount}
            />
          )}
        />
      </Switch>
    </main>
  );
}
