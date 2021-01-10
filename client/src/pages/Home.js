import React from 'react'
import Nav from '../components/Nav'
import Goal from '../components/Goal'
import DateTime from '../components/DateTime'
import CustomTimeLine from '../components/CustomTimeLine'
import "../styles/Layout.css"


export default (props) => {
    const { account, setNeedsRefresh } = props;

  if (account !== null && account !== undefined) {
    return(
        <div className="main-container">
            <div>
                <h1>Welcome back, {account.firstName}</h1>
            </div>
            <div className="nav">
                <Nav />
            </div>
            <div>
                <CustomTimeLine />
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
        </div>
    )
} else {
    <div>Looking for your profile...</div>;
}
}