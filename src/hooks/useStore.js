import { useContext } from 'react'

import { StoreContext } from '../context/StoreContext'

const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}

export default useStore
