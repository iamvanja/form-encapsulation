import React from 'react'
import PropTypes from 'prop-types'
import Wrap from './Wrap'
import { Field } from 'formik'
import classnames from 'classnames'

const typeProp = PropTypes.oneOf([
  'text',
  'number',
  'password',
  'email',
  'url',
  'search',
  'tel',
  'radio',
  'checkbox',
  'hidden',
  'color',
  'date',
  'month',
  'time',
  'datetime',
  'datetime-local'
]).isRequired

export const Input = ({ type, ...rest }) =>
  <Field
    type={type}
    {...rest}
  />

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array
  ]),
  type: typeProp
}

const InputWrap = (props) => (
  <Wrap
    component={Input}
    {...props}
    className={classnames(props.className, ['type-' + props.type])}
  />
)

InputWrap.propTypes = {
  className: PropTypes.string,
  type: typeProp
}

export default InputWrap
