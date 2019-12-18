import * as yup from 'yup'
import { } from './customMethods'
import {
  PHONE_NUMBER,
  UUID,
  DOMAIN,
  PASSWORD
} from 'utils/regex'

export const ref = yup.ref
export const basicMixed = yup.mixed()
export const basicString = yup.string().trim()
export const basicArray = yup.array()
export const basicNumber = yup.number()
export const positiveNumber = basicNumber.positive() // Includes 0 - https://github.com/jquense/yup/issues/322
export const positiveOrZeroIntegerNumber = basicNumber
  .integer()
  .min(0)
  .max(Number.MAX_SAFE_INTEGER)
export const positiveIntegerNumber = basicNumber
  .integer()
  .min(1)
  .max(Number.MAX_SAFE_INTEGER)
export const basicBool = yup.boolean()
export const basicDate = yup.date()
export const name = basicString.max(255)
export const email = basicString.email()
export const url = basicString.url()
export const oneZero = basicNumber.oneOf([0, 1]).default(0)
export const uuid = yup.string().trim()
  .matches(UUID, {
    excludeEmptyString: true,
    message: 'Not a valid UUID'
  })
export const phone = yup.string()
  .matches(PHONE_NUMBER, {
    excludeEmptyString: true,
    message: 'Not a valid phone number'
  })
export const domain = yup.string().trim()
  .matches(DOMAIN, {
    excludeEmptyString: false,
    message: 'Not a valid domain'
  })
export const password = yup.string()
  .min(10)
  .max(255)
  .matches(PASSWORD, {
    excludeEmptyString: true,
    message: 'Invalid character in password'
  })
  .test(
    'password',
    'Passwords must be at least 10 characters and have at least two of the following: uppercase letter, lowercase letter, number, symbol.',
    function (value, element) {
      var coincidenceCount = 0
      if (/[a-z]+/.test(value)) {
        coincidenceCount++
      }
      if (/[A-Z]+/.test(value)) {
        coincidenceCount++
      }
      if (/[0-9]+/.test(value)) {
        coincidenceCount++
      }
      if (/[{}[\]<>,./!@#$%^&*()]+/.test(value)) {
        coincidenceCount++
      }

      return coincidenceCount >= 2
    }
  )

/**
 *
 * HOC that provides an escape hatch when you need to validate a number, but
 * also want to allow special values that would not validate otherwise
 *
 * Usage: schema = withAllow('', yup.number().required().min(3).max(5))
 *
 * @param {*} allowedValue
 * @param {YupSchema} schema
 */
export const withAllow = (allowedValue, schema) => {
  allowedValue = Array.isArray(allowedValue) ? allowedValue : [allowedValue]

  return yup
    .mixed()
    .test('withAllow', 'Invalid', function validate (value) {
      if (allowedValue.includes(value)) {
        return true
      }

      try {
        schema.validateSync(value, this.options)
      } catch (err) {
        // create error explicitly to override default 'Invalid' err message
        return this.createError({
          path: err.path,
          message: err.message
        })
      }

      return true
    })
    .transform(function (currentValue, originalValue) {
      var casted

      if (allowedValue.includes(currentValue)) {
        return currentValue
      }

      try {
        casted = schema.cast(currentValue)
      } catch (err) {
        // casting failed, let the validation throw an error
        casted = currentValue
      }

      return casted
    })
}
