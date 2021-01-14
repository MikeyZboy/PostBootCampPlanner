import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({children}) => {

    return (
      <div className="grid-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        {children}
      </div>
    );
}

export default Layout