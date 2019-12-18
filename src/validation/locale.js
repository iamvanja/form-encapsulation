/* eslint-disable no-template-curly-in-string */
import setLocale from 'yup/lib/setLocale'

const newLocale = {
  mixed: {
    default: 'Invalid',
    required: 'Required',
    oneOf: 'Not an allowed value',
    notOneOf: 'Not an allowed value',
    notType: 'Must be a ${type} type'
  },
  string: {
    length: 'Must be exactly ${length} characters',
    min: 'Must be at least ${min} characters',
    max: 'Must be at most ${max} characters',
    matches: 'Pattern is not valid',
    email: 'Must be a valid email',
    url: 'Must be a valid URL'
  },
  number: {
    min: 'Must be greater than or equal to ${min}',
    max: 'Must be less than or equal to ${max}',
    lessThan: 'Must be less than ${less}',
    moreThan: 'Must be greater than ${more}',
    notEqual: 'Must be not equal to ${notEqual}',
    positive: 'Must be a positive number',
    negative: 'Must be a negative number',
    integer: 'Must be a "whole number" (have no decimal places)'
  },
  array: {
    min: 'Field must have at least ${min} items',
    max: 'Field must have less than or equal to ${max} items'
  }
}

setLocale(newLocale)
