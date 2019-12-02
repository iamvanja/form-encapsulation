import React from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'config/propTypes'
import { Field } from 'formik'
import classnames from 'classnames'
import Label from './Label'
import ErrorMessage, { isError } from './ErrorMessage'

const Wrap = (props) => {
  const {
    name,
    label,
    labelAfterComponent,
    component: Component,
    groupLabelLeft,
    groupLabelRight,
    ignoreError,
    ignoreArrayError,
    errorArrayRenderer,
    id,
    className,
    ...rest
  } = props

  return (
    <Field
      name={name}
      render={({
        field: { value, onChange },
        form: { errors, touched, setFieldTouched }
      }) => {
        const { errorMessage, hasError } = isError(errors, touched, name, {
          ignoreArrayError, errorArrayRenderer
        })
        const elementId = id || 'form-el-' + name
        const formElement = (
          <Component
            className={classnames(className, {
              'is-invalid-input': hasError
            })}
            name={name}
            id={elementId}
            value={value}
            onChange={e => {
              setFieldTouched(name, true)
              onChange(e)
            }}
            {...rest}
          />
        )
        const labelContent = (
          <Label
            className='label-text'
            htmlFor={elementId}
            hasError={hasError}
          >
            {label}
          </Label>
        )

        return (
          <div
            className={classnames('form-element', className, {
              'is-disabled': rest.disabled,
              'is-required': rest.required
            })}
          >
            {!labelAfterComponent && labelContent}

            {formElement}

            {!!labelAfterComponent && labelContent}

            <ErrorMessage
              isVisible={!ignoreError && hasError}
              message={errorMessage}
            />
          </div>
        )
      }}
    />
  )
}

Wrap.propTypes = {
  name: PropTypes.string.isRequired,
  label: renderable,
  labelAfterComponent: PropTypes.bool,
  component: renderable.isRequired,
  groupLabelLeft: renderable,
  groupLabelRight: renderable,
  ignoreError: PropTypes.bool,
  ignoreArrayError: PropTypes.bool,
  errorArrayRenderer: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string
}

export default Wrap
