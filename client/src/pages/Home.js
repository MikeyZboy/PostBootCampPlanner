import React from 'react'
import Nav from '../components/Nav'
import Goal from '../components/Goal'
import DateTime from '../components/DateTime'
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
                <Nav />
            </div>   
            <div>
                <Goal 
                account={props.account}
                setNeedsRefresh={setNeedsRefresh}
                />
            </div>
            <div>
                <DateTime />
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