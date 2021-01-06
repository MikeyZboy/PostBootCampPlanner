import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute";
import Home from '../pages/Home'
import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { __GetProfile } from '../services/AccountService'

export default function Router() {
    const [account, setAccount] = useState(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    const localAccountId = localStorage.getItem("account_id");

    const retrieveAccount = async (account_id) => {
      console.log('retrieveAccount, account_id:', account_id)
      console.log('retrieveAccount localAccountId:', localAccountId)
      try {
        const thisAccount = await __GetProfile(parseInt(localAccountId));
        setAccount(thisAccount);
        return thisAccount;
      } catch (error) {}
    };

    if ((account === null && localAccountId !== null) || needsRefresh) {
      setNeedsRefresh(false);
      const retrievedAccount = retrieveAccount(localAccountId);
      setAccount(retrievedAccount);
    }

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
            component={(props) => (
              <SignUp {...props} setAccount={setAccount} />
            )}
          />
          <Route
            exact
            path="/signin"
            component={(props) => (
              <SignIn {...props} setAccount={setAccount} />
            )}
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
        </Switch>
      </main>
    );
}

