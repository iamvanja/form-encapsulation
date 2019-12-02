import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import LoadingResults from './LoadingResults'

const Button = props => {
  const { type, icon, onClick, className, children, isLoading, ...rest } = props
  return (
    <button
      {...rest}
      onClick={onClick}
      type={type || 'button'}
      className={classnames('button', className, {
        'is-loading': isLoading
      })}
    >
      {isLoading
        ? <LoadingResults />
        : children && (<span>{children}</span>)
      }
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool
}

export default Button
