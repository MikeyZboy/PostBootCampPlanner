import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Lessons from "../pages/Lessons";
import Resources from '../pages/Resources'
import Achievements from "../pages/Achievements";
import { __GetProfile } from "../services/AccountService";
import { __CheckSession } from '../services/UserService'
import Layout from "../components/Layout";

const Router = () => {

  const [account, setAccount] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const retrieveAccount = async () => {
    const localAccountId = localStorage.getItem("account_id");
    try {
      const thisAccount = await __GetProfile(parseInt(localAccountId));
      setAccount(thisAccount);
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
        <Route path="/welcome" component={() => <Welcome />} />
        <Route
          exact
          path="/signup"
          component={(props) => <SignUp {...props} setAccount={setAccount} />}
        />
        <Route
          exact
          path="/signin"
          component={(props) => (
            <SignIn
              {...props}
              setAccount={setAccount}
            />
          )}
        />
        <ProtectedRoute
          authenticated={account !== null}
          path="/home"
          component={(props) => (
            <Layout>
              <Home
                {...props}
                account={account}
                onClickSignOut={clearAccount}
                setNeedsRefresh={setNeedsRefresh}
              />
            </Layout>
          )}
        />
        <ProtectedRoute
          authenticated={account !== null}
          path="/lessons"
          component={(props) => (
            <Layout>
              <Lessons
                {...props}
                account={account}
                onClickSignOut={clearAccount}
              />
            </Layout>
          )}
        />
        <ProtectedRoute
          authenticated={account !== null}
          path="/resources"
          component={(props) => (
            <Layout>
              <Resources
                {...props}
                account={account}
                onClickSignOut={clearAccount}
              />
            </Layout>
          )}
        />
        <ProtectedRoute
          authenticated={account !== null}
          path="/achievements"
          component={(props) => (
            <Layout>
              <Achievements
                {...props}
                account={account}
                onClickSignOut={clearAccount}
              />
            </Layout>
          )}
        />
      </Switch>
    </main>
  );
}
export default withRouter(Router);