import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'config/propTypes'
import { Formik, Form } from 'formik'
import Button from 'ui/Button'
import { cleanFormValues, getDefaultFormValues } from 'utils/form'

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

class FormWrap extends Component {
  constructor () {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (formValues, formikBag) {
    const { setSubmitting, setValues } = formikBag

    Promise.resolve(this.props.onSubmit(formValues, formikBag))
      .then(() =>
        Promise.resolve(this.props.getSubmitPromise(formValues, formikBag))
          .then(serverValues => {
            setSubmitting(false)

            setValues(
              getDefaultFormValues(serverValues, Object.keys(formValues))
            )
            this.props.onSubmitComplete(
              null, cleanFormValues(serverValues), formikBag
            )
          })
          .catch(err => {
            setSubmitting(false)

            this.props.onSubmitComplete(err, {}, formikBag)
          })
      )
      .catch(() => {
        setSubmitting(false) // Parent form escaped
      })
  }

  render () {
    const {
      isDebug,
      children,
      className,
      hasUnsavedChanges,
      buttonRowComponent,
      ...rest
    } = this.props

    return (
      <Formik
        enableReinitialize
        {...rest}
        onSubmit={this.handleSubmit}
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
                  showUnsavedMessage: hasUnsavedChanges && isDirty
                })}
              </Form>
            </Fragment>
          )
        }}
      />
    )
  }
}


FormWrap.defaultProps = {
  onSubmit: () => true,
  onSubmitComplete: () => true,
  buttonRowComponent: defaultButtonRowComponent,
}

FormWrap.propTypes = {
  children: renderable.isRequired,
  isDebug: PropTypes.bool,
  hasUnsavedChanges: PropTypes.func,
  buttonRowComponent: PropTypes.func,
  className: PropTypes.string,
  getSubmitPromise: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onSubmitComplete: PropTypes.func,
}

export default FormWrap
