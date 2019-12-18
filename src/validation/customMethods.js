import * as yup from 'yup'
import isInteger from 'lodash/isInteger'

// Yup's number().integer() method is limited because it uses bitwise OR for
// isInteger - https://github.com/jquense/yup/blob/master/src/number.js#L8
const isIntegerNumber = function () {
  return this.test(
    'integer',
    'Must be a "whole number" (have no decimal places)',
    function validateInteger (value) {
      if (value === null) {
        return true
      }

      return isInteger(value)
    }
  )
}

// Usage of this rule only makes sense after it is followed by the `url` rule
const schemesOnly = function (
  schemes = [],
  message = 'Only URLs beginning with ' + schemes.join(', ') + ' are allowed'
) {
  return this.test(
    'schemesOnly',
    message,
    function isValid (value) {
      // exclude empty string so that other (earlier validations) can
      // raise this error instead
      if (!value) {
        return true
      }

      return schemes.some(function (scheme) {
        return value.startsWith(scheme)
      })
    }
  )
}

// Remove once this is merged: https://github.com/jquense/yup/pull/347
const ensureArray = function () {
  return this.default(() => []).transform(
    (val, orig) => {
      const value = val || orig

      return (value === null ? [] : [].concat(value))
    }
  )
}

const isUniqueArray = function () {
  return this.test(
    'unique',
    'Items must be unique',
    function (values) {
      if (values === null) {
        return true
      }

      return values.length === new Set(values).size
    }
  )
}

const ensureNull = function () {
  return this
    .nullable()
    .default(null)
    .transform((val, orgi) => null)
}

yup.addMethod(yup.number, 'integer', isIntegerNumber)
yup.addMethod(yup.string, 'schemesOnly', schemesOnly)
yup.addMethod(yup.array, 'ensure', ensureArray)
yup.addMethod(yup.array, 'unique', isUniqueArray)
yup.addMethod(yup.mixed, 'ensureNull', ensureNull)
