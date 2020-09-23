import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import BoughtItems from './pages/BoughtItems/BoughtItems'
import ReceivedList from './pages/ReceivedList/ReceivedList'

import Sidebar from './components/Sidebar/Sidebar'

import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/bought-items">
            <BoughtItems />
          </Route>
          <Route exact path="/Received-list">
            <ReceivedList />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
