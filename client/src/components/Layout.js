import React from 'react'
import Sidebar from '../components/Sidebar'
// import Mountains from '../styles/mountains-noborders.png'

const Layout = ({children}) => {

    return (
      <div className="grid-container">
          {/* <img src={Mountains} alt="mountains backdrop"/> */}
        <div className="sidebar">
          <Sidebar />
        </div>
        {children}
      </div>
    );
}

export default Layout