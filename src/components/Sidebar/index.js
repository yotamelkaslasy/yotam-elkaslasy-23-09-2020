import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.scss'

const Sidebar = () => {
  return (
    <aside className="Sidebar">
      <nav>
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
      </nav>
    </aside>
  )
}

export default Sidebar
