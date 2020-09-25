import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks'

import './FetchCurrencyError.scss'

const FetchCurrencyError = observer(() => {
  const rootStore = useStore()
  return rootStore.data.fetchCurrencyError ? (
    <div className="FetchCurrencyError">
      {rootStore.data.fetchCurrencyErrorMessage}
    </div>
  ) : null
})

export default FetchCurrencyError
