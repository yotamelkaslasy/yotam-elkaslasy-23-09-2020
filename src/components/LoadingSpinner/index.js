import React from 'react'

import './LoadingSpinner.scss'

const LoadingSpinner = ({ isLoading }) => {
  return isLoading ? (
    <div className="LoadingSpinner">
      <div></div>
      <div></div>
    </div>
  ) : null
}

export default LoadingSpinner
