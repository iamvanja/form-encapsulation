import React from 'react'
import PropTypes from 'prop-types'
import { getIn } from 'formik'
import classnames from 'classnames'

export const isError = (errors, touched, name, options = {}) => {
  const { ignoreArrayError = false, errorArrayRenderer } = options
  const isTouched = getIn(touched, name)
  let errorMessage = getIn(errors, name) || ''

  // Some info around the need for this logic is here:
  // https://github.com/jaredpalmer/formik/issues/1172
  if (Array.isArray(errorMessage)) {
    if (ignoreArrayError) {
      errorMessage = null
    } else if (typeof errorArrayRenderer === 'function') {
      errorMessage = errorArrayRenderer(errorMessage)
    } else {
      errorMessage = null
    }
  }

  const hasError = !!(errorMessage && isTouched)

  return { isTouched, errorMessage, hasError }
}

const ErrorMessage = ({ isVisible, message }) => (
  <span className={classnames('form-error', {
    'is-visible': isVisible
  })}>
    {message}
  </span>
)

ErrorMessage.propTypes = {
  isVisible: PropTypes.bool,
  message: PropTypes.string
}

export default ErrorMessage
