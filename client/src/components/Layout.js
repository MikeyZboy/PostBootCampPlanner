import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({children}) => {

    return (
      <div className="grid-container">
        <div>
          <Sidebar />
        </div>
        <div className="main">
        {children}
        </div>
      </div>
    );
}

export default Layout