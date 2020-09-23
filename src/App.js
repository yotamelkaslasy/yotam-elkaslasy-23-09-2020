import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import List from './pages/List'
import Received from './pages/Received'

import Sidebar from './components/Sidebar'

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
          <Route exact path="/list">
            <List />
          </Route>
          <Route exact path="/received">
            <Received />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
