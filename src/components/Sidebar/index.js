import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.scss'

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" activeClassName="active">
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/received" activeClassName="active">
              Received
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
