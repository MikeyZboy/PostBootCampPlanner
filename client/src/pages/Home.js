import React from 'react'
import Nav from '../components/Nav'
import Goal from '../components/Goal'
import DateTime from '../components/DateTime'
import CustomTimeLine from '../components/CustomTimeLine'
import "../styles/Layout.css"
import "../styles/Main.css"
import "../styles/Nav.css"

export default (props) => {
    const { account, setNeedsRefresh } = props;

  if (account !== null && account !== undefined) {
    return(
        <div>
            <header className="header">
                <h1>Welcome back, {account.firstName}</h1>
            </header>
            <div>
                <Goal 
                account={props.account}
                setNeedsRefresh={setNeedsRefresh}
                />
            </div>
        </div>
    )
} else {
    <div>Looking for your profile...</div>;
}
}