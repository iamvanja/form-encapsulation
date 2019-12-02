import React from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'config/propTypes'
import classnames from 'classnames'

const Label = ({ hasError, children, className, ...rest }) => (
  <label
    className={classnames(className, {
      'is-invalid-label': hasError
    })}
    {...rest}
  >
    {children}
  </label>
)

Label.propTypes = {
  hasError: PropTypes.bool,
  children: renderable.isRequired,
  className: PropTypes.string
}

export default Label
