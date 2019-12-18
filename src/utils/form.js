import mapValues from 'lodash/mapValues'

const getSingleProperty = (object, key) =>
  object[key] === null || !object.hasOwnProperty(key)
    ? ''
    : object[key]

export const getDefaultFormValues = (object = {}, keys = []) =>
  keys.reduce((accumulator, currentKey) => ({
    ...accumulator,
    [currentKey]: getSingleProperty(object, currentKey)
  }), {})

export const cleanFormValues = value => {
  if (value === '') {
    return null
  }
  if (Array.isArray(value)) {
    return value.map(cleanFormValues)
  }
  if (typeof value === 'object' && value !== null) {
    return mapValues(value, cleanFormValues)
  }

  return value
}
