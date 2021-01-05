import React from 'react'
import SignOut from '../components/SignOut'

export default (props) => {
    const { account, onClickSignOut, setNeedsRefresh } = props;

  if (account !== null && account !== undefined) {
    return(
        <div>
            <div>
                <h1>Welcome back, {account.firstName}</h1>
            </div>
            <div>
                <SignOut onClick={onClickSignOut}/>
            </div>
        </div>
    )
} else {
    <div>Looking for your profile...</div>;
}
}