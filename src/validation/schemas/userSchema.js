import * as p from '../primitives'

const requiredName = p.name.required().default(null)
const positiveInteger = p.positiveOrZeroIntegerNumber.nullable().default(null)
export const vendorId = p.basicString.nullable().default(null)

export default {
  id: positiveInteger,
  firstName: requiredName,
  lastName: requiredName,
  email: p.email.required(),
  username: p.basicString
    .when('email', (email, schema) => schema
      .oneOf([email])
      .default(email)
      .required()
    ),
  // todo: demo a custom rule
  vendorId,
  enabled: p.basicBool.default(false),
  created: p.basicDate,
  updated: p.basicDate,
  password: p.password.required(),
}
