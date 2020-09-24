import React from 'react'

import './Button.scss'

const Button = ({ primary, onClick, title, className, type = 'button' }) => {
  return (
    <button
      type={type}
      className={`Button ${className}`}
      onClick={onClick}
      style={{ background: !primary && '#ccc' }}>
      {title}
    </button>
  )
}

export default Button
