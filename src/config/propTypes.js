import PropTypes from 'prop-types'

export const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

export const stringOrNumberOrBool = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
])

export const renderable = PropTypes.oneOfType([
  // A React element.
  PropTypes.element,

  // Anything that can be rendered: numbers, strings,
  // elements or an array(or fragment) containing these types.
  PropTypes.node,

  // A functional React component
  PropTypes.func
])

export const selectOptions = PropTypes.arrayOf(
  PropTypes.shape({
    value: stringOrNumberOrBool.isRequired,
    label: renderable.isRequired
  })
)
