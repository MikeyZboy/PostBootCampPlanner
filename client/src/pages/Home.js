import React from 'react'
import Goal from '../components/Goal'
import DateTime from '../components/DateTime'
import CustomTimeLine from '../components/CustomTimeLine'
import "../styles/Layout.css"
// import Mountains from '../assets/mountains-noborders.png'

export default (props) => {
    const { account, setNeedsRefresh } = props;

  if (account !== null && account !== undefined) {
    return(
        <div className="background">
        {/* <img src={Mountains} alt="mountains"/> */}
                <header className="head">
                <h1>Welcome back, {account.firstName}</h1>
                </header>
            <div className="main">
                <Goal 
                account={props.account}
                setNeedsRefresh={setNeedsRefresh}
                />
            </div>
            <div className="main">
                Future Calendar integration here
            </div>
        </div>
    )
} else {
    <div>Searching for your profile...</div>;
}
}