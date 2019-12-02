import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'config/propTypes'
import { Formik, Form } from 'formik'
import Button from 'ui/Button'

const defaultButtonRowComponent = (formProps, options) => {
  const { showUnsavedMessage } = options
  const { isSubmitting } = formProps

  return (
    <div
      align='right'
      className='button-row'
    >
      {showUnsavedMessage && (
        <span className='unsaved-message'>
          Please save your changes.
        </span>
      )}
      <div>
        <Button
          type='submit'
          className='expanded'
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : 'Save'
          }
        </Button>
      </div>
    </div>
  )
}

const FormWrap = (props) => {
  const {
    isDebug,
    children,
    className,
    hasUnsavedChanges,
    buttonRowComponent,
    isButtonRowSticky,
    onDirtyChange,
    ...rest
  } = props

  return (
    <Formik
      enableReinitialize
      {...rest}
      render={(formProps) => {
        // In some scenarios formik's dirty calculation is incorrect
        // so lets add the ability to use custom unsaved/dirty logic
        // that individual forms can provide.
        const isDirty = hasUnsavedChanges
          ? hasUnsavedChanges(formProps.values)
          : formProps.dirty

        return (
          <Fragment>
            <Form noValidate className={className}>
              {!!isDebug && (
                <div className='debug-container'>
                  <pre>{JSON.stringify(formProps, null, 2)}</pre>
                </div>
              )}

              <div>
                {
                  typeof children === 'function'
                    ? children(formProps)
                    : children
                }
              </div>

              {buttonRowComponent(formProps, {
                showUnsavedMessage: hasUnsavedChanges && isDirty,
                isButtonRowSticky
              })}
            </Form>
          </Fragment>
        )
      }}
    />
  )
}

FormWrap.defaultProps = {
  buttonRowComponent: defaultButtonRowComponent,
  onDirtyChange: () => { }
}

FormWrap.propTypes = {
  children: renderable.isRequired,
  isDebug: PropTypes.bool,
  hasUnsavedChanges: PropTypes.func,
  buttonRowComponent: PropTypes.func,
  isButtonRowSticky: PropTypes.bool,
  className: PropTypes.string,
  onDirtyChange: PropTypes.func,
}

export default FormWrap
