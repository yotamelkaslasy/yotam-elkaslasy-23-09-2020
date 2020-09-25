import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.scss'

const Sidebar = () => {
  return (
    <aside className="Sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/list" className="App-link" activeClassName="active">
              List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/received"
              className="App-link"
              activeClassName="active">
              Received
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
