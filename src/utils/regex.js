export const PHONE_NUMBER = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/im

export const SSN = /^(\d{3})-?\d{2}-?\d{4}$/

export const EIN = /^(\d{2})-?\d{7}$/

export const ZIP_CODE_US = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/

export const UUID = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[0-9a-f]{4}-?[0-9a-f]{12}$/

export const ALPHANUMERIC = /^[a-z0-9]+$/i

export const DOMAIN = /^((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+((xn--){1}[a-z0-9]{1,59}|[a-z]{2,63})$/i // eslint-disable-line

export const PASSWORD = /^[a-zA-Z0-9{}[\]<>,./!@#$%^&*()]+$/
