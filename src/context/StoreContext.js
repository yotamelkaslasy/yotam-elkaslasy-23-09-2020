import React, { createContext } from 'react'
import { useLocalStore } from 'mobx-react-lite'

import { createStore } from '../store/createStore'

const StoreContext = createContext()

const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore)
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export { StoreContext, StoreProvider }
