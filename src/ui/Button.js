import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Button = props => {
  const { type, icon, onClick, className, children, ...rest } = props
  return (
    <button
      {...rest}
      onClick={onClick}
      type={type || 'button'}
      className={classnames('button', className)}
    >
      <span>{children}</span>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
}

export default Button
