import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { StoreProvider } from './context/StoreContext'

import List from './pages/List'
import Received from './pages/Received'

import Sidebar from './components/Sidebar'

import './App.scss'

function App() {
  return (
    <StoreProvider>
      <Router basename="/yotam-elkaslasy-23-09-2020">
        <Sidebar />

        <main className="App">
          <Switch>
            <Route exact path="/">
              <Redirect to="/list" />
            </Route>
            <Route exact path="/list">
              <List />
            </Route>
            <Route exact path="/received">
              <Received />
            </Route>
          </Switch>
        </main>
      </Router>
    </StoreProvider>
  )
}

export default App
