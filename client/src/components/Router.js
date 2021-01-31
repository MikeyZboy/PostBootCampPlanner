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
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)

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
    verifyTokenValid(),
    retrieveAccount();
    setPageLoading(false)
  }, []);

  const clearAccount = () => {
    setAccount(null);
  };

  const verifyTokenValid = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const session = await __CheckSession()
        setCurrentUser(sesson)
        setAuthenticated(true)
        props.history.push('/home')
      } catch (error) {
        console.log(error)
        setCurrentUser(null)
        setAuthenticated(false)
        localStorage.clear()
      }
    }
  }

  const toggleAuthenticated = (value, user, done) => {
    setAuthenticated(value)
    setCurrentUser(user)
    done()
  }

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
              toggleAuthenticated={authenticated}
            />
          )}
        />
        <ProtectedRoute
          authenticated={authenticated}
          path="/home"
          component={(props) => (
            <Layout currentUser={currentUser} authenticated={authenticated}>
              <Home
                {...props}
                account={account}
                onClickSignOut={clearAccount}
                setNeedsRefresh={setNeedsRefresh}
                currentUser={currentUser}
              />
            </Layout>
          )}
        />
        <ProtectedRoute
          authenticated={authenticated}
          path="/lessons"
          component={(props) => (
            <Layout currentUser={currentUser} authenticated={authenticated}>
              <Lessons
                {...props}
                account={account}
                onClickSignOut={clearAccount}
                currentUser={currentUser}
              />
            </Layout>
          )}
        />
        <ProtectedRoute
          authenticated={authenticated}
          path="/resources"
          component={(props) => (
            <Layout currentUser={currentUser} authenticated={authenticated}>
              <Resources
                {...props}
                account={account}
                onClickSignOut={clearAccount}
                currentUser={currentUser}
              />
            </Layout>
          )}
        />
        <ProtectedRoute
          authenticated={authenticated}
          path="/achievements"
          component={(props) => (
            <Layout currentUser={currentUser} authenticated={authenticated}>
              <Achievements
                {...props}
                account={account}
                onClickSignOut={clearAccount}
                currentUser={currentUser}
              />
            </Layout>
          )}
        />
      </Switch>
    </main>
  );
}
export default withRouter(Router);