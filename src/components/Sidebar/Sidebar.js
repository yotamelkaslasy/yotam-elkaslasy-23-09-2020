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
            <NavLink to="/bought-items" activeClassName="active">
              Bought Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/received-list" activeClassName="active">
              Received List
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
